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
import {resetCheckboxState} from '../actions/checkboxActions';
import {IBulkUserActionType} from '../interfaces';
import {QueryFilter} from '../components/PagedList/Filters/QueryFilter';
import {IOuterFilterProps, createOuterFilterForm} from '../components/PagedList/Filters/OuterFilter';
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
    showDefaultActions?: boolean;
    customAction?: React.ComponentClass<any> | JSX.Element;
}

let OuterFilter: React.ComponentClass<IOuterFilterProps>;

export class PagedListImpl extends React.Component<IPagedListProps, void> {

    fetchInstanceList(resource, filters: {max?: number, offset?: number} = {}): void {
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
        this.fetchInstanceList(this.props.resource, {offset: (pageNumber - 1) * this.props.max});
        this.props.setPage(pageNumber, this.props.resource);
        this.props.resetCheckboxState();
        window.scrollTo(0, 0);
    };

    renderUserActions = (): JSX.Element => {
        if (this.props.userActionsMap && this.props.userActionsMap.length > 0) {
            return(
                <UserActions isDisabled={true} userActionsMap={this.props.userActionsMap}/>
            );
        }
        return null;
    }

    render(): JSX.Element {
        let activePage: number = this.props.activePage;
        let items: number = this.props.max ? Math.ceil(this.props.totalCount / this.props.max) : 1;
        return (
            <div>
                <h2 className="caps">
                    {this.props.resource.capitalize()} List
                    <Link to={`${this.props.resource}/create`} ><i className="fa fa-plus" /></Link>
                </h2>
                <div style={outerFilterStyle}>
                    <OuterFilter resource={this.props.resource}>
                        <QueryFilter placeholder="Search" paramName="query" label="Search"/>
                    </OuterFilter>
               </div>
               <PagedListFilters resource={this.props.resource}>
                    {this.props.children}
                </PagedListFilters>
                {this.props.userActionsMap && this.props.userActionsMap.length ? 
                        this.renderUserActions() : null}
                <DataGrid
                        instanceList={this.props.instanceList}
                        properties={this.props.properties}
                        handleRecordDelete={this.props.handleRecordDelete}
                        totalCount={this.props.totalCount}
                        showDefaultActions={this.props.showDefaultActions}
                        customAction={this.props.customAction}
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

const outerFilterStyle: React.CSSProperties = {
    maxWidth: '30%',
    margin: '-10px 0px -20px -15px'
};
