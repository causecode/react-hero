import * as React from 'react';
const reactRouterDom = require<any>('react-router-dom');

export interface IAuthRouteProps {
    path: string;
    component: React.ComponentClass<any>;
    onEnter: () => boolean;
    redirectTo: string;
}

export class AuthRoute extends React.Component<IAuthRouteProps, void> {

    render(): JSX.Element {
        let {Route, Redirect} = reactRouterDom;
        let {onEnter, path, component, redirectTo} = this.props;

        return onEnter() ? <Route path={path} component={component} /> : <Redirect from={path} to={redirectTo} />;
    }
}
