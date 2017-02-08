import * as React from 'react';
import { BaseModel } from '../models/BaseModel';
import '../utils/appService';
export interface IPagedListDispatchProps {
    setPage?: (pageNumber: number, resource: string) => void;
}
export interface IPagedListStateProps {
    properties?: string[];
    instanceList?: BaseModel[];
    totalCount?: number;
    activePage?: number;
}
export interface IPagedListProps extends IPagedListStateProps, IPagedListDispatchProps {
    max: number;
    resource: string;
}
export declare class PagedListImpl extends React.Component<IPagedListProps, void> {
    fetchInstanceList(resource: any, filters?: {
        max?: number;
        offset?: number;
    }): void;
    constructor(props: IPagedListProps);
    static defaultProps: IPagedListProps;
    componentWillMount(): void;
    handlePagination: any;
    render(): JSX.Element;
}
declare let PagedList: React.ComponentClass<IPagedListProps>;
export { PagedList };
