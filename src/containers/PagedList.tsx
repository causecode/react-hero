import * as React from 'react';
import { Table, Pagination } from 'react-bootstrap';
import QueryFilter from '../components/PagedList/Filters/QueryFilter';
import DropDownFilter from '../components/PagedList/Filters/DropDownFilter';
import RangeFilter from '../components/PagedList/Filters/RangeFilter';
import DateRangeFilter from '../components/PagedList/Filters/DateRangeFilter';
import {PagedListFilters} from '../components/PagedList/Filters/PagedListFilter';
import DataGrid from '../components/PagedList/DataGrid';
import { fetchInstanceList } from '../actions/data';
import {setPage} from '../actions/data';
import {Link} from 'react-router';
import {IFilter} from '../components/PagedList/Filters/IFilters';
import '../utils/appService.ts';

const connect = require<any>('react-redux').connect;

export interface IListPageProps extends React.Props<{}> {
    properties: string[];
    instanceList: IBaseModel[];
    totalCount: number;
    fetchInstanceList: ((resource: string, offset?: number) => void) ;
    setPage: (pageNumber: number) => void;
    activePage: number;
    resource: string;
}

export class PagedListImpl extends React.Component<IListPageProps, {}> {
    itemsPerPage: number;

    constructor(props: IListPageProps) {
        super();
        if (!props.resource) {
            throw new Error('No resource name passed.');
        }
        this.itemsPerPage = 1;
    }

    static defaultProps: IListPageProps = {
        properties: [],
        resource: '',
        totalCount: 0,
        activePage: 1,
        instanceList: [],
        fetchInstanceList: (resource, offset) => { return; },
        setPage: (pageNumber) => { return; }
    };

    componentWillMount() {
        const { resource } = this.props;
        this.props.fetchInstanceList(resource, 0);
    };

    setItemsPerPage(itemsPerPage: number) {
        this.itemsPerPage = itemsPerPage;
    }

    handlePagination = (pageNumber: number) => {
        this.props.fetchInstanceList(this.props.resource, (( pageNumber - 1 ) * this.itemsPerPage));
        this.props.setPage(pageNumber);
    };

    render() {
        let activePage: number = this.props.activePage;
        this.setItemsPerPage(this.props.instanceList.length);
        let items: number = this.itemsPerPage ? Math.ceil(this.props.totalCount / this.itemsPerPage) : 1;
        return (
            <div>
                <h2 className="caps">
                    {this.props.resource.capitalize()} List
                    <Link to={`${this.props.resource}/create`} ><i className="fa fa-plus" /></Link>
                </h2>
                <PagedListFilters resource={this.props.resource}>
                        {this.props.children}
                    </PagedListFilters>
                    <DataGrid
                        instanceList={ this.props.instanceList }
                        properties={ this.props.properties }
                    />
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={5}
                        items={items}
                        activePage={activePage}
                        onSelect={this.handlePagination} />
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        properties: state.data.get('properties', []),
        instanceList: state.data.get('instanceList', []).toJS(),
        totalCount:  state.data.get('totalCount', 0),
        activePage: state.data.get('activePage', 1)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchInstanceList: (resource: string, offset: number) => {
            dispatch(fetchInstanceList(resource, offset));
        },
        setPage: (pageNumber) => {
            dispatch(setPage(pageNumber));
        }
    };
}
let PagedList = connect(
    mapStateToProps,
    mapDispatchToProps
)(PagedListImpl);

export {PagedList};
