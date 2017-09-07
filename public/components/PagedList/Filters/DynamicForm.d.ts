/// <reference types="react" />
import * as React from 'react';
import { IPagedListFiltersProps } from '../../../interfaces';
export declare class InnerFilterFormImpl extends React.Component<IPagedListFiltersProps, void> {
    static defaultProps: IPagedListFiltersProps;
    sendFilters(resource: string): void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    render(): JSX.Element;
}
export declare function createFilterForm(resource: string): React.ComponentClass<IPagedListFiltersProps>;
