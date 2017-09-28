/// <reference types="react" />
import * as React from 'react';
export interface IGenericListPageProps {
    resource: string;
}
export declare class GenericListPage extends React.Component<IGenericListPageProps, void> {
    static defaultProps: IGenericListPageProps;
    render(): JSX.Element;
}
