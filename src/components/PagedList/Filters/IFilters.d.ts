import {FieldProp} from 'redux-form';
import {Component, Props} from 'react';
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
