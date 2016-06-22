import * as React from 'react';
import Container from '../components/Container';
import { Table, Pagination } from 'react-bootstrap';
import QueryFilter from '../components/PagedList/Filters/QueryFilter';
import DropDownFilter from '../components/PagedList/Filters/DropDownFilter';
import RangeFilter from '../components/PagedList/Filters/RangeFilter';
import DateRangeFilter from '../components/PagedList/Filters/DateRangeFilter';

import PagedListFilters from '../components/PagedList/Filters/PagedListFilter';
import DataGrid from '../components/PagedList/DataGrid';
import { fetchInstanceList } from '../actions/data';
import {setPage} from "../actions/data";
import {IFilter} from "../components/PagedList/Filters/IFilters";

const connect = require<any>('react-redux').connect;

interface IListPageProps extends React.Props<any> {
    properties: Array<any>;
    instanceList: any;
    totalCount: number;
    fetchInstanceList: (resource: string, filter: IFilter) => void;
    setPage: (pageNumber: number) => void;
    activePage: number;
    resource: string;
}

function mapStateToProps(state) {
    return {
        properties: state.data.get('properties', []),
        instanceList: state.data.get('instanceList', []),
        totalCount:  state.data.get('totalCount', 0),
        router: state.router,
        activePage: state.data.get('activePage', 1)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchInstanceList: (resource: string, filter: IFilter) => dispatch(fetchInstanceList(resource, filter)),
        setPage: (pageNumber) => {
            //dispatch(fetchInstanceList(resource, {offset: (( pageNumber - 1 ) * this.itemsPerPage)}));
            dispatch(setPage(pageNumber))
        }
    };
}

class ListPage extends React.Component<IListPageProps, {}> {

    itemsPerPage: number;
    resource: string;

    constructor(props) {
        super();
        this.state = {activePage : 1};
        this.resource = props.resource;
    }

    componentWillMount() {
        this.props.fetchInstanceList(this.props.resource, {offset: 0});
    };

    setItemsPerPage(itemsPerPage: number) {
        if (!this.itemsPerPage) {
            this.itemsPerPage = itemsPerPage;
        }
    }

    handlePagination = (pageNumber: number) => {
        this.props.fetchInstanceList(this.resource, {offset: (( pageNumber - 1 ) * this.itemsPerPage)});
        this.props.setPage(pageNumber)
    };

    render() {
        const { instanceList, properties, totalCount, activePage } = this.props;
        this.setItemsPerPage(instanceList.size);

        return (
            <Container size={4} center>
                <h2 className="caps">Page List</h2>

                <PagedListFilters
                    clazz="blog"
                >
                    <RangeFilter
                        label = 'Bill Amount'
                        paramName = 'billAmount'
                    />

                    <DateRangeFilter
                        label = 'Date Created'
                        paramName = 'dateCreated'
                    />

                    <DropDownFilter
                        label = 'status'
                        paramName = 'status'
                        possibleValues = {['enable', 'disable', 'inactive']}
                    />
                    <DropDownFilter
                        label = 'types'
                        paramName = 'types'
                        possibleValues = {['Zoo', 'Jungle', 'Forest']}
                    />

                    <QueryFilter
                        label="search"
                        paramName = 'search'
                        fields={["First Name", "Last Name"]}
                    />

                </PagedListFilters>
                <DataGrid
                    instanceList={ instanceList }
                    properties={ properties }
                    totalCount={ totalCount }
                    clazz="blog" />

                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={Math.ceil(totalCount / this.itemsPerPage)}
                    maxButtons={5}
                    activePage={activePage}
                    onSelect={this.handlePagination} />

            </Container>
        );
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage);
