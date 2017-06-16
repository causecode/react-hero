import * as React from 'react';
import { BaseModel } from '../models/BaseModel';
import { IDataGridProps } from '../components/PagedList/DataGrid';
import '../utils/appService';
import { IBulkUserActionType, IPagedListFiltersProps, CustomActionType, IPagedListStyle } from '../interfaces';
export interface IPagedListDispatchProps {
    setPage?: (pageNumber: number, resource: string) => void;
    resetCheckboxState?: () => void;
}
export interface IPagedListStateProps {
    properties?: string[];
    instanceList?: BaseModel[];
    totalCount?: number;
    activePage?: number;
}
export interface IPagedListState {
    data: {
        get: (resourceKey: string, {}) => IPagedListStateProps & {
            toJS?: () => IPagedListStateProps;
        };
    };
}
export interface IPagedListProps extends IPagedListStateProps, IPagedListDispatchProps {
    max?: number;
    offset?: number;
    resource: string;
    filters?: any;
    handleRecordDelete?: Function;
    userActionsMap?: IBulkUserActionType[];
    showDefaultActions?: boolean;
    customActions?: CustomActionType;
    pageHeader?: JSX.Element;
    pagedListFilters?: React.ComponentClass<IPagedListFiltersProps> | JSX.Element;
    dataGrid?: React.ComponentClass<IDataGridProps> | JSX.Element;
    pagination?: JSX.Element;
    afterFilters?: JSX.Element;
    fetchInstanceList?: (resource: string, ...args: any[]) => void;
    successCallBack?: () => void;
    failureCallBack?: () => void;
    style?: IPagedListStyle;
    isBordered?: boolean;
}
export declare class PagedListImpl extends React.Component<IPagedListProps, void> {
    private offset;
    fetchInstanceList(resource: any, filters?: {
        max?: number;
        offset?: number;
    }): void;
    constructor(props: IPagedListProps);
    static defaultProps: IPagedListProps;
    componentWillMount(): void;
    componentWillUnmount(): void;
    handlePagination: any;
    renderUserActions: () => JSX.Element;
    renderPagedListFilters: () => JSX.Element;
    renderDataGrid: () => JSX.Element;
    render(): JSX.Element;
}
declare let PagedList: React.ComponentClass<IPagedListProps>;
export { PagedList };
