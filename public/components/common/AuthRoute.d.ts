/// <reference types="react" />
import * as React from 'react';
export interface IAuthRouteProps {
    path: string;
    component: React.ComponentClass<any>;
    onEnter: () => boolean;
    redirectTo: string;
    exact?: boolean;
}
export declare class AuthRoute extends React.Component<IAuthRouteProps> {
    render(): JSX.Element;
}