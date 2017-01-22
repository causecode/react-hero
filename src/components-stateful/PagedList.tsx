import * as React from 'react';
import {Pagination} from 'react-bootstrap';
import {PagedListFilters} from '../components/PagedList/Filters/PagedListFilter';
import {DataGrid} from '../components/PagedList/DataGrid';
import {setPage} from '../actions/modelActions';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {BaseModel} from '../models/BaseModel';
import {ModelService} from '../utils/modelService';
import {UserActions} from '../components/PagedList/BulkUserActions';
import {resetCheckboxState} from '../actions/userActions';
import {resetSelectedRecords} from '../utils/checkboxUtils';
import {IPagedListFiltersProps, IBulkUserActionType} from '../interfaces/index';
import {createFilterForm} from '../components/PagedList/Filters/DynamicForm';
import {QueryFilter} from '../components/PagedList/Filters/QueryFilter';
import '../utils/appService';
const objectAssign = require<any>('object-assign');

export interface IPagedListDispatchProps {
    setPage?: (pageNumber: number, resource: string) => void;
    resetCheckboxState?: () => void;
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
    filters?: any;
    handleRecordDelete?: Function;
    userActionsMap?: IBulkUserActionType[];
}

let OuterQueryFilter: React.ComponentClass<IPagedListFiltersProps>;
export class PagedListImpl extends React.Component<IPagedListProps, void> {

    fetchInstanceList(resource, filters: {max?: number, offset?: number} = {}) {
        filters = this.props.filters ? objectAssign(filters, this.props.filters) : filters;
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
        const {resource} = this.props;
        this.fetchInstanceList(resource);
    };

    componentWillUnmount(): void {
        resetSelectedRecords();
    }

    /*
     * Using any here because the type defined by react-bootstrap i.e. SelectCallback was not assignable here.
     * TODO Remove any in handlePagination.
     */
    handlePagination: any = (pageNumber: number, e: React.SyntheticEvent): void => {
        if (pageNumber !== this.props.activePage) {
            this.props.resetCheckboxState();
        }
        this.fetchInstanceList(this.props.resource, {offset: (pageNumber - 1) * this.props.max});
        this.props.setPage(pageNumber, this.props.resource);
        resetSelectedRecords();
        window.scrollTo(0, 0);
    };

    getUserActionsComponent = (): JSX.Element => {
        if (this.props.userActionsMap && this.props.userActionsMap.length > 0) {
            return(
                <UserActions isDisabled={true} userActionsMap={this.props.userActionsMap}/>
            );
        }
        return <span></span>;
    }

    render(): JSX.Element {
        OuterQueryFilter = createFilterForm(this.props.resource);
        let activePage: number = this.props.activePage;
        let items: number = this.props.max ? Math.ceil(this.props.totalCount / this.props.max) : 1;
        return (
            <div>
                <h2 className="caps">
                    {this.props.resource.capitalize()} List
                    <Link to={`${this.props.resource}/create`} ><i className="fa fa-plus" /></Link>
                </h2>
                <OuterQueryFilter resource={this.props.resource} filtersOpen={true} fields={['query']}>
                    <QueryFilter
                            label="Search"
                            paramName="query"
                            placeholder={['Search']}
                    />
                </OuterQueryFilter>
                <PagedListFilters resource={this.props.resource} filters={this.props.filters}>
                    {this.props.children}
                </PagedListFilters>
                {this.getUserActionsComponent()}
                <DataGrid
                        instanceList={this.props.instanceList}
                        properties={this.props.properties}
                        handleRecordDelete={this.props.handleRecordDelete}
                        totalCount={this.props.totalCount}
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
                        onSelect={this.handlePagination} 
                />
            </div>
        );
    };
}

function mapStateToProps(state, ownProps): IPagedListStateProps {
    let resourceData: IPagedListStateProps & {toJS?: () => IPagedListStateProps} =
            state.data.get(`${ownProps.resource}List`, {});
    resourceData = resourceData.toJS ? resourceData.toJS() : resourceData;
    return {
        properties: resourceData.properties,
        instanceList: resourceData.instanceList,
        totalCount:  resourceData.totalCount,
        activePage: resourceData.activePage
    };
}

function mapDispatchToProps(dispatch): IPagedListDispatchProps {
    return {
        setPage: (pageNumber, resource) => {
            dispatch(setPage(pageNumber, resource));
        },
        resetCheckboxState: () => {
            dispatch(resetCheckboxState());
        }
    };
}
let PagedList = connect<{}, {}, IPagedListProps>(
    mapStateToProps,
    mapDispatchToProps
)(PagedListImpl);

export {PagedList};
