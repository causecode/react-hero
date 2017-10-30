/// <reference types="react" />
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BaseModel } from '../models/BaseModel';
import { IInstanceContainerProps, IRouteParams } from '../interfaces';
import '../init';
export declare type EditPageProps = IInstanceContainerProps & RouteComponentProps<IRouteParams>;
export declare class EditPageImpl extends React.Component<EditPageProps, void> {
    static defaultProps: IInstanceContainerProps;
    isCreatePage(): boolean;
    fetchInstanceFromServer: () => void;
    componentWillMount(): void;
    handleSubmit: (instance: BaseModel, successCallBack?: (args: any) => {}, failureCallBack?: (args: any) => {}) => void;
    handleDelete: (instance: BaseModel, successCallBack?: (args: any) => {}, failureCallBack?: (args: any) => {}) => void;
    componentWillReceiveProps(nextProps: EditPageProps): void;
    render(): JSX.Element;
}
declare let EditPage: any;
export { EditPage };
