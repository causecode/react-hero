import * as React from 'react';
import { Props } from 'react';
import { BaseModel } from '../models/BaseModel';
export { CSSProperties as CSS } from 'react';
export declare type Stub = (...args: any[]) => void;
export declare type CustomActionType = React.ReactNode;
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
export declare type Dictionary<T> = {
    [key: string]: T;
};
export interface IRouteParams {
    resource: string;
    resourceID?: string;
}
export interface IInstanceContainerProps {
    params: IRouteParams;
    instance: BaseModel;
}
export interface IInstancePageProps {
    instance: BaseModel;
    resource?: string;
}
export interface IImmutable {
    toJS: () => Object;
    getIn: (keys: string[], defaultVaue: Object) => Object | IImmutable;
}
export interface IFilter {
    paramName?: string;
    label?: string;
    offset?: number;
    sort?: 'asc' | 'desc';
    type?: string;
}
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
    getIn: (keys: string[], defaultVaue: Object) => Object | IImmutable;
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
    payload: number | boolean;
}
export interface IBulkUserActions {
    type: string;
    payload: number | string;
}
export interface IGenericAction {
    type: string;
}
export interface IUserAction {
    type: string;
    payload: number | boolean | string;
}
export interface IDropDownFilterData {
    label: string;
    value: string;
}
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
