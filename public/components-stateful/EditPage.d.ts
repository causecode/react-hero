import * as React from 'react';
import { BaseModel } from '../models/BaseModel';
import { IInstanceContainerProps } from '../interfaces';
import { IInjectedProps } from 'react-router';
import '../init';
export declare type EditPageProps = IInstanceContainerProps & IInjectedProps;
export declare class EditPageImpl extends React.Component<EditPageProps, void> {
    static defaultProps: EditPageProps;
    isCreatePage(): boolean;
    fetchInstanceFromServer: () => void;
    componentWillMount(): void;
    handleSubmit: (instance: BaseModel) => void;
    handleDelete: () => void;
    componentWillReceiveProps(nextProps: EditPageProps): void;
    render(): JSX.Element;
}
declare let EditPage: React.ComponentClass<EditPageProps>;
export { EditPage };
