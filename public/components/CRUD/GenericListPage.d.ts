/// <reference types="react" />
import * as React from 'react';
export interface IGenericListPageProps {
    resource: string;
}
export declare class GenericListPage extends React.Component<IGenericListPageProps, {}> {
    static defaultProps: IGenericListPageProps;
    render(): JSX.Element;
}
