import * as React from 'react';
import { IInstanceContainerProps } from '../interfaces';
export declare class ShowPageImpl extends React.Component<IInstanceContainerProps, void> {
    static defaultProps: IInstanceContainerProps;
    fetchInstanceData(resource: string, resourceID: string): void;
    componentWillMount(): void;
    render(): JSX.Element;
}
declare let ShowPage: any;
export { ShowPage };
