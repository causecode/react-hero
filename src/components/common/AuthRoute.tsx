import * as React from 'react';
const reactRouterDom = require<any>('react-router-dom');

export interface IAuthRouteProps {
    path: string;
    component: React.ComponentClass<any>;
    onEnter: () => boolean;
    redirectTo: string;
    exact?: boolean;
}

export class AuthRoute extends React.Component<IAuthRouteProps> {

    render(): JSX.Element {
        let {Route, Redirect} = reactRouterDom;
        let {onEnter, path, component, redirectTo, exact} = this.props;
        let routeProps: Partial<IAuthRouteProps> = exact ? {path, component, exact} : {path, component};

        return onEnter() ? <Route {...routeProps} /> : <Redirect from={path} to={redirectTo} />;
    }
}
