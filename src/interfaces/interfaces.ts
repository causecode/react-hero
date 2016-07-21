import {FieldProp} from 'redux-form';
import {Component, Props} from 'react';

export interface IBaseModel {
    instanceData: any;
    resourceName: string;
}

export type Stub = (...args: any[]) => void ;

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

export interface IRouteParams {
    resource: string;
    resourceID?: string;
}

export interface IInstanceContainerProps {
    params: IRouteParams;
    fetchInstanceData: (resource: string, resourceID?: string) => void;
    instances: IBaseModel[];
}

export interface IGenericEditPageState {
    instance: IBaseModel;
}

export interface IInstancePageProps {
    instance: IBaseModel;
    resource?: string;
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
    sendFilters?: (resource: string) => void;
    resource?: string;
    filtersOpen?: boolean;
}
