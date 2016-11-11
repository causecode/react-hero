import * as React from 'react';
import {Pagination} from 'react-bootstrap';
import {PagedListFilters} from '../components/PagedList/Filters/PagedListFilter';
import {DataGrid} from '../components/PagedList/DataGrid';
import {setPage} from '../actions/modelActions';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {BaseModel} from '../models/BaseModel';
import {ModelService} from '../utils/modelService';
import '../utils/appService';

export interface IPagedListDispatchProps {
    setPage?: (pageNumber: number, resource: string) => void;
}

export interface IPagedListStateProps {
    properties?: string[];
    instanceList?: BaseModel[];
    totalCount?: number;
    activePage?: number;
}

export interface IPagedListProps extends IPagedListStateProps, IPagedListDispatchProps {
    max: number;
    resource: string;
}

export class PagedListImpl extends React.Component<IPagedListProps, void> {

    fetchInstanceList(resource, filters: {max?: number, offset?: number} = {}) {
        if (this.props.max > 0) {
            filters.max = this.props.max;
        }
        ModelService.getModel(resource).list(filters);
    }

    constructor(props: IPagedListProps) {
        super();
        if (!props.resource) {
            throw new Error('No resource name passed.');
        }
    }

    static defaultProps: IPagedListProps = {
        properties: [],
        resource: '',
        max: 20,
        totalCount: 0,
        activePage: 1,
        instanceList: [],
        setPage: (pageNumber: number) => { return; }
    };

    componentWillMount(): void {
        const { resource } = this.props;
        this.fetchInstanceList(resource);
    };

    // TODO remove any from handlePagination
    handlePagination: any = (pageNumber: number, e: React.SyntheticEvent): void => {
        this.fetchInstanceList(this.props.resource, {offset: (pageNumber - 1) * this.props.max});
        this.props.setPage(pageNumber, this.props.resource);
    };

    render(): JSX.Element {
        let activePage: number = this.props.activePage;
        let items: number = this.props.max ? Math.ceil(this.props.totalCount / this.props.max) : 1;
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

function mapStateToProps(state, ownProps): IPagedListStateProps {
    let instanceList: IPagedListStateProps & {toJS?: () => IPagedListStateProps} =
            state.data.get(`${ownProps.resource}List`, {} );
    instanceList = instanceList.toJS ? instanceList.toJS() : instanceList;
    return {
        properties: instanceList.properties,
        instanceList: instanceList.instanceList,
        totalCount:  instanceList.totalCount,
        activePage: instanceList.activePage
    };
}

function mapDispatchToProps(dispatch): IPagedListDispatchProps {
    return {
        setPage: (pageNumber, resource) => {
            dispatch(setPage(pageNumber, resource));
        }
    };
}
let PagedList = connect<{}, {}, IPagedListProps>(
    mapStateToProps,
    mapDispatchToProps
)(PagedListImpl);

export {PagedList};
