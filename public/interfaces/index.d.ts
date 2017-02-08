import { FieldProp } from 'redux-form';
import { Props } from 'react';
import { BaseModel } from '../models/BaseModel';
export declare type Stub = (...args: any[]) => void;
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
    label?: string;
    paramName?: string;
    offset?: number;
    sort?: 'asc' | 'desc';
    fields?: FieldProp | FieldProp[];
}
export interface IPagedListFiltersProps extends Props<{}> {
    fields?: string[];
    resource?: string;
    filtersOpen?: boolean;
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
