/// <reference types="react" />
import * as React from 'react';
import { IPagedListFiltersProps } from '../../../interfaces';
export declare class PagedListFilters extends React.Component<IPagedListFiltersProps, void> {
    static defaultProps: IPagedListFiltersProps;
    componentWillMount(): void;
    toggleFilters: () => void;
    render(): JSX.Element;
}
