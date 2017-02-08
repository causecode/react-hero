import * as React from 'react';
import { IPagedListFiltersProps } from '../../../interfaces';
export declare class InnerFilterForm extends React.Component<IPagedListFiltersProps, void> {
    static defaultProps: IPagedListFiltersProps;
    sendFilters(resource: string): void;
    handleSubmit: (e: any) => void;
    render(): JSX.Element;
}
export declare function createFilterForm(resource: any): typeof InnerFilterForm;
