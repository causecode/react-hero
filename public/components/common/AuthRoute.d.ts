/// <reference types="react" />
import * as React from 'react';
export interface IAuthRouteProps {
    path: string;
    component: React.ComponentClass<any>;
    onEnter: () => boolean;
    redirectTo: string;
}
export declare class AuthRoute extends React.Component<IAuthRouteProps, void> {
    render(): JSX.Element;
}
