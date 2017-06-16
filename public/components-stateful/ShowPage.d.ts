import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IInstanceContainerProps, IRouteParams } from '../interfaces';
export declare type ShowPageProps = IInstanceContainerProps & RouteComponentProps<IRouteParams>;
export declare class ShowPageImpl extends React.Component<ShowPageProps, void> {
    static defaultProps: IInstanceContainerProps;
    fetchInstanceData(resource: string, resourceID: string): void;
    componentWillMount(): void;
    render(): JSX.Element;
}
declare let ShowPage: any;
export { ShowPage };
