import * as React from 'react';
import {Pagination} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {BaseModel} from '../models/BaseModel';
import {setPage} from '../actions/modelActions';
import {scrollToTop} from '../utils/commonUtils';
import {ModelService} from '../utils/modelService';
import {resetCheckboxState} from '../actions/checkboxActions';
import {UserActions} from '../components/PagedList/BulkUserActions';
import {QueryFilter} from '../components/PagedList/Filters/QueryFilter';
import {DataGrid, IDataGridProps} from '../components/PagedList/DataGrid';
import {PagedListFilters} from '../components/PagedList/Filters/PagedListFilter';
import {IOuterFilterProps, createOuterFilterForm} from '../components/PagedList/Filters/OuterFilter';
import '../utils/appService';
const objectAssign = require<any>('object-assign');
const FontAwesome = require<any>('react-fontawesome');
import {
    IBulkUserActionType,
    IPagedListFiltersProps,
    IDispatch, CustomActionType,
    IPagedListStyle,
} from '../interfaces';

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

export interface IPagedListState {
    data: {
        get: (resourceKey: string, {}) => IPagedListStateProps & {toJS?: () => IPagedListStateProps};
    };
}

export interface IPagedListProps extends IPagedListStateProps, IPagedListDispatchProps {
    max?: number;
    offset?: number;
    resource: string;
    filters?: any;
    handleRecordDelete?: Function;
    userActionsMap?: IBulkUserActionType[];
    showDefaultActions?: boolean;
    customActions?: CustomActionType;
    dbType?: string;

    // List of props that can be passed to make PagedList customizable
    pageHeader?: JSX.Element;
    pagedListFilters?: React.ComponentClass<IPagedListFiltersProps> | JSX.Element;
    dataGrid?: React.ComponentClass<IDataGridProps> | JSX.Element;
    pagination?: JSX.Element;
    afterFilters?: JSX.Element;
    fetchInstanceList?: (resource: string, ...args: any[]) => void;
    successCallBack?: () => void;
    failureCallBack?: () => void;
    style?: IPagedListStyle;
    isBordered?: boolean;
}

let OuterFilter: React.ComponentClass<IOuterFilterProps>;

export class PagedListImpl extends React.Component<IPagedListProps, void> {

    private offset: number = 0;

    fetchInstanceList(resource, filters: {max?: number, offset?: number, dbType?: string} = {}): void {
        if (!this.props.fetchInstanceList) {
            filters = this.props.filters ? objectAssign(filters, this.props.filters) : filters;
            if (this.props.max > 0) {
                filters.max = this.props.max;
            }
            ModelService.getModel(resource).list(filters);
        }
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
        setPage: (pageNumber: number) => { return; },
        style: {
            searchButton: {},
            headerStyle: {},
            dataStyle: {},
            rowStyle: {},
        },
        isBordered: true,
        dbType: 'Mysql',
    };

    componentWillMount(): void {
        const {resource} = this.props;
        this.fetchInstanceList(resource, {dbType: this.props.dbType});
        OuterFilter = createOuterFilterForm(`${this.props.resource}Filters`);
    };

    componentWillUnmount(): void {
        this.props.resetCheckboxState();
    }
    /*
     * Using any here because the type defined by react-bootstrap i.e. SelectCallback was not assignable here.
     * TODO Remove any in handlePagination.
     */
    handlePagination: any = (pageNumber: number, e: React.SyntheticEvent): void => {
        if (pageNumber !== this.props.activePage) {
            this.props.resetCheckboxState();
        }
        this.offset =  (pageNumber - 1) * this.props.max;
        this.fetchInstanceList(this.props.resource, {offset: this.offset, dbType: this.props.dbType});
        this.props.setPage(pageNumber, this.props.resource);
        this.props.resetCheckboxState();
        scrollToTop();
    };

    renderUserActions = (): JSX.Element => {
        if (this.props.userActionsMap && this.props.userActionsMap.length > 0) {
            return(
                <UserActions
                        isDisabled={true}
                        userActionsMap={this.props.userActionsMap}
                        totalCount={this.props.totalCount} />
            );
        }
        return null;
    }

    renderPagedListFilters = (): JSX.Element => {
        if (!this.props.pagedListFilters) {
            return (
                <PagedListFilters
                        resource={this.props.resource}
                        successCallBack={this.props.successCallBack}
                        failureCallBack={this.props.failureCallBack}>
                    {this.props.children}
                </PagedListFilters>
            );
        }
        if (typeof this.props.pagedListFilters === 'function') {
            let CustomPagedListFilters: React.ComponentClass<IPagedListFiltersProps> = this.props.pagedListFilters;

            return (
                <CustomPagedListFilters resource={this.props.resource}>
                    {this.props.children}
                </CustomPagedListFilters>
            );
        }
        return this.props.pagedListFilters;
    }

    renderDataGrid = (): JSX.Element => {
        if (!this.props.dataGrid) {
            return(
                <DataGrid
                        instanceList={this.props.instanceList}
                        max={this.props.max}
                        offset={this.props.offset || this.offset}
                        properties={this.props.properties}
                        handleRecordDelete={this.props.handleRecordDelete}
                        totalCount={this.props.totalCount}
                        showDefaultActions={this.props.showDefaultActions}
                        customActions={this.props.customActions}
                        style={this.props.style}
                        isBordered={this.props.isBordered}
                />
            );
        }
        if (typeof this.props.dataGrid === 'function') {
            let CustomDataGrid: React.ComponentClass<IDataGridProps> = this.props.dataGrid;

            return (
                <CustomDataGrid
                        instanceList={this.props.instanceList}
                        max={this.props.max}
                        offset={this.props.offset || this.offset}
                        properties={this.props.properties}
                        handleRecordDelete={this.props.handleRecordDelete}
                        totalCount={this.props.totalCount}
                        style={this.props.style}
                        isBordered={this.props.isBordered}
                />
            );
        }

        return this.props.dataGrid;
    }

    render(): JSX.Element {
        let {activePage, style} = this.props;
        let numberOfPages: number = this.props.max ? Math.ceil(this.props.totalCount / this.props.max) : 1;
        return (
            <div>
                {this.props.pageHeader ||
                    <h2 className="caps">
                        {this.props.resource.capitalize()} List
                        <Link to={`/${this.props.resource}/create`} >
                            <FontAwesome name="plus" />
                        </Link>
                    </h2>
                }

                <div>
                    <OuterFilter style={style.searchButton} resource={this.props.resource}>
                        <QueryFilter placeholder="Search" paramName="query" label="Search"/>
                    </OuterFilter>
                </div>

                {this.renderPagedListFilters()}

                {this.renderUserActions()}

                {this.props.afterFilters}

                {this.renderDataGrid()}

                {this.props.pagination ||
                    <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={5}
                            items={numberOfPages}
                            activePage={activePage}
                            onSelect={this.handlePagination}
                    />
                }
            </div>
        );
    };
}

function mapStateToProps(state: IPagedListState, ownProps): IPagedListStateProps {
    let resourceData: IPagedListStateProps & {toJS?: () => IPagedListStateProps} =
            state.data.get(`${ownProps.resource}List`, {});
    resourceData = resourceData.toJS ? resourceData.toJS() : resourceData;
    return {
        properties: resourceData.properties,
        instanceList: resourceData.instanceList,
        totalCount:  resourceData.totalCount,
        activePage: resourceData.activePage,
    };
}

function mapDispatchToProps(dispatch: IDispatch): IPagedListDispatchProps {
    return {
        setPage: (pageNumber, resource) => {
            dispatch(setPage(pageNumber, resource));
        },
        resetCheckboxState: () => {
            dispatch(resetCheckboxState());
        },
    };
}
let PagedList: React.ComponentClass<IPagedListProps> = connect(mapStateToProps, mapDispatchToProps)(PagedListImpl);

export {PagedList};
