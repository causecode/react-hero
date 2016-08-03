import {FieldProp} from 'redux-form';
import {Component, Props} from 'react';
import {BaseModel} from '../models/BaseModel';

// Data type for a stub function.
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

// Data passed in the Instance Page routes.
export interface IRouteParams {
    resource: string;
    resourceID?: string;
}

// Props used by Instance Page Containers.
export interface IInstanceContainerProps {
    params: IRouteParams;
    fetchInstanceData: (resource: string, resourceID?: string) => void;
    instances: BaseModel[];
}

// Props used by the Instance Pages.
export interface IInstancePageProps {
    instance: BaseModel;
    resource?: string;
}

// Basic interface used by all filters.
export interface IFilter {
    label?: string;
    paramName?: string;
    offset?: number;
    sort?: 'asc' | 'desc';
    fields?: FieldProp | FieldProp[];
}

// Interface for props used by the PagedListFilters.
export interface IPagedListFiltersProps extends Props<{}> {
    fields?: string[];
    sendFilters?: (resource: string) => void;
    resource?: string;
    filtersOpen?: boolean;
}
