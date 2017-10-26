/// <reference types="react" />
import * as React from 'react';
import { IInstancePageProps } from '../../interfaces';
import { BaseModel } from '../../models/BaseModel';
export interface IGenericEditPageProps extends IInstancePageProps {
    location?: {
        pathname?: string;
    };
    handleSubmit: (instance: BaseModel, successCallBack?: ((args) => {}), failureCallBack?: ((args) => {})) => void;
    handleDelete?: (instance: BaseModel, successCallBack?: ((args) => {}), failureCallBack?: ((args) => {})) => void;
    params: {
        resource: string;
    };
    instance: BaseModel;
    isCreatePage: boolean;
}
export declare class GenericEditPage extends React.Component<IGenericEditPageProps, void> {
    static defaultProps: IGenericEditPageProps;
    getResource(): string;
    fetchStoreInstance: () => BaseModel;
    handleSubmit: () => void;
    handleDelete: () => void;
    render(): JSX.Element;
}
