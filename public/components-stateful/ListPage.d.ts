import * as React from 'react';
import { IRouteParams } from '../interfaces';
export interface IListPage extends React.Props<void> {
    params?: IRouteParams;
}
export declare class ListPage extends React.Component<IListPage, void> {
    static defaultProps: IListPage;
    render(): JSX.Element;
}
