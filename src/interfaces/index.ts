import * as React from 'react';
import {Props} from 'react';
import {BaseModel} from '../models/BaseModel';
export {CSSProperties as CSS} from 'react';

// Data type for a stub function.
export type Stub = (...args: any[]) => void ;

export type CustomActionType = React.ReactNode;

export interface IShallowTestUtils {
    findAll: any;
    findAllWithClass: any;
    findAllWithType: any;
    findWithClass: any;
    findWithRef: any;
    findWithType: any;
    isComponentOfType: any;
    isDOMComponent: any;
}

// Type for a generic object
export type Dictionary<T> = {[key: string]: T}

// Data passed in the Instance Page routes.
export interface IRouteParams {
    resource: string;
    resourceID?: string;
}

// Props used by Instance Page Containers.
export interface IInstanceContainerProps {
    instance: BaseModel;
}

// Props used by the Instance Pages.
export interface IInstancePageProps {
    instance: BaseModel;
    resource?: string;
}

export interface IImmutable {
    toJS: () => Object;
    getIn: (keys : string[], defaultVaue : Object) => Object | IImmutable;
}

// Basic interface used by all filters.
export interface IFilter {
    paramName?: string;
    label?: string;
    offset?: number;
    sort?: 'asc' | 'desc';
    // Added for range-filter customization to render field as number input field or normal text input field
    type?: string;
}

// Interface for props used by the PagedListFilters.
export interface IPagedListFiltersProps extends Props<{}> {
    fields?: string[];
    resource?: string;
    filtersOpen?: boolean;
    path?: string;
    successCallBack?: (response: any) => void;
    failureCallBack?: (error: any) => void;
}

export interface IFromJS {
    set: Function;
    get: Function;
    toJS: Function;
}

export interface IImmutable {
    toJS: () => Object;
    getIn: (keys : string[], defaultVaue : Object) => Object | IImmutable;
}

export interface IUserReducer {
    action: string;
    records: number;
}

export interface ICheckboxReducer {
    selectedIds: number[];
    selectAll: boolean;
    selectAllOnPage: boolean;
}

export interface IBulkUserActionType {
    label: string;
    action: Function;
}

export interface ICheckboxReducerAction {
    type: string;
    payload: number|boolean;
}

export interface IBulkUserActions {
    type: string;
    payload: number|string;
}

export interface IGenericAction {
    type: string;
    payload?: any;
}

export interface IUserAction {
    type: string;
    payload: number|boolean|string;
}

export interface IDropDownFilterData {
    label: string;
    value: string;
}

// Type any is intentional
export interface IDispatch {
    (action: any): any;
}

export interface IStoreInstanceType {
    instanceList?: BaseModel[];
    totalCount?: number;
    activePage?: number;
    properties?: any;
}

export interface IAlertType {
    show: boolean;
    type: string;
    message: string;
}

export interface IAlertAction {
    type: string;
    payload: {
        alertType: string;
        alertMessage: string;
    };
}

export interface IDispatchProps {
    saveData?: (model: string, value: any) => void;
}

export interface IPagedListStyle {
    queryFilterLength?: number;
    searchButton?: React.CSSProperties;
    headerStyle?: React.CSSProperties;
    rowStyle?: React.CSSProperties;
    dataStyle?: React.CSSProperties;
}

export interface IColumnNames {
    label: string;
    accessor: string;
}

export interface INavMenuReducer {
    primaryNav: boolean;
    secondaryNav: boolean;
    primaryNavCount: number;
    secondaryNavCount: number;
}
