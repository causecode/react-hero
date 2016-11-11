import {FieldProp} from 'redux-form';
import {Props} from 'react';
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
    instance: BaseModel;
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
    resource?: string;
    filtersOpen?: boolean;
}

export interface IFromJS {
    set: Function;
    get: Function;
    toJS: Function;
}
