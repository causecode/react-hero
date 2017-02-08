import * as React from 'react';
import { IPagedListFiltersProps } from '../../../interfaces';
export declare class PagedListFilters extends React.Component<IPagedListFiltersProps, void> {
    filterProps: string[];
    static defaultProps: IPagedListFiltersProps;
    constructFilters(): void;
    toggleFilters(): void;
    render(): JSX.Element;
}
