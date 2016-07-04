import * as React from 'react';
import Container from '../components/Container';
import { Table, Pagination } from 'react-bootstrap';
import QueryFilter from '../components/PagedList/Filters/QueryFilter';
import DropDownFilter from '../components/PagedList/Filters/DropDownFilter';
import RangeFilter from '../components/PagedList/Filters/RangeFilter';
import DateRangeFilter from '../components/PagedList/Filters/DateRangeFilter';
import {PagedListFilters} from '../components/PagedList/Filters/PagedListFilter';
import DataGrid from '../components/PagedList/DataGrid';
import { fetchInstanceList } from '../actions/data';
import {setPage} from "../actions/data";
import {IFilter} from "../components/PagedList/Filters/IFilters";
import '../utils/appService.ts';

const connect = require<any>('react-redux').connect;

interface IListPageProps extends React.Props<any> {
    properties: Array<any>;
    instanceList: any;
    totalCount: number;
    fetchInstanceList: (resource: string, offset?: number, model?: Function) => void;
    setPage: (pageNumber: number) => void;
    activePage: number;
    resource: string;
    model: Function
}

class PagedListImpl extends React.Component<IListPageProps, {}> {

    itemsPerPage: number;
    resource: string;

    constructor(props: IListPageProps) {
        super();
        this.resource = props.resource;
    }

    componentWillMount() {
        const { resource, model } = this.props;
        this.props.fetchInstanceList(resource, 0);
    };

    setItemsPerPage(itemsPerPage: number) {
        if (!this.itemsPerPage) {
            this.itemsPerPage = itemsPerPage;
        }
    }

    handlePagination = (pageNumber: number) => {
        this.props.fetchInstanceList(this.resource, (( pageNumber - 1 ) * this.itemsPerPage));
        this.props.setPage(pageNumber)
    };

    render() {
        const { instanceList, properties, totalCount, activePage } = this.props;
        this.setItemsPerPage(instanceList.size);
        return (
        <Container size={4} center>
            <h2 className="caps">{this.resource.capitalize()} List</h2>
            <PagedListFilters resource={this.resource}>
                    {this.props.children}
                </PagedListFilters>
                <DataGrid
                    instanceList={ instanceList }
                    properties={ properties }
                    totalCount={ totalCount }
                    resource={this.resource} />

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
        fetchInstanceList: (resource: string, offset: number) => {dispatch(fetchInstanceList(resource, offset))},
        setPage: (pageNumber) => {
            dispatch(setPage(pageNumber))
        }
    };
}
let PagedList = connect(
    mapStateToProps,
    mapDispatchToProps
)(PagedListImpl);

export {PagedList};
