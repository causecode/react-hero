import * as React from 'react';
import { Table, Pagination } from 'react-bootstrap';
import {PagedListFilters} from '../components/PagedList/Filters/PagedListFilter';
import {DataGrid} from '../components/PagedList/DataGrid';
import {setPage} from '../actions/data';
import {Link} from 'react-router';
const connect = require<any>('react-redux').connect;
import {BaseModel} from '../models/BaseModel';
import {ModelService} from '../utils/modelService';
import '../utils/appService';

export interface IPagedListProps extends React.Props<{}> {
    properties: string[];
    instanceList: BaseModel[];
    totalCount: number;
    setPage: (pageNumber: number) => void;
    activePage: number;
    resource: string;
}

export class PagedListImpl extends React.Component<IPagedListProps, {}> {
    itemsPerPage: number;

    fetchInstanceList(resource) {
        ModelService.getModel(resource).list();
    }

    constructor(props: IPagedListProps) {
        super();
        if (!props.resource) {
            throw new Error('No resource name passed.');
        }
        this.itemsPerPage = 1;
    }

    static defaultProps: IPagedListProps = {
        properties: [],
        resource: '',
        totalCount: 0,
        activePage: 1,
        instanceList: [],
        setPage: (pageNumber) => { return; }
    };

    componentWillMount(): void {
        const { resource } = this.props;
        this.fetchInstanceList(resource);
    };

    setItemsPerPage(itemsPerPage: number): void {
        this.itemsPerPage = itemsPerPage;
    }

    handlePagination = (pageNumber: number): void => {
        this.fetchInstanceList(this.props.resource);
        this.props.setPage(pageNumber);
    };

    render(): JSX.Element {
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

function mapStateToProps(state): {
    properties: string[];
    instanceList: BaseModel[];
    totalCount: number;
    activePage: number
} {
    return {
        properties: state.data.get('properties', []) as string[],
        instanceList: state.data.get('instanceList', []).toJS(),
        totalCount:  state.data.get('totalCount', 0),
        activePage: state.data.get('activePage', 1)
    };
}

function mapDispatchToProps(dispatch): {
    setPage: (pageNumber: number) => void;
} {
    return {
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
