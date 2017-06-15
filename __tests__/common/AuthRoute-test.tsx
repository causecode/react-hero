jest.unmock('../../src/components/common/AuthRoute');

import * as React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {ShallowWrapper, shallow} from 'enzyme';
import {AuthRoute, IAuthRouteProps} from '../../src/components/common/AuthRoute';
import {UserListPage} from '../../src/demo/components/UserListPage';

describe('Test cases for AuthenticateRoute component', (): void => {

    let authRoute: ShallowWrapper<IAuthRouteProps, void> = shallow<IAuthRouteProps, void> (
        <AuthRoute
                path="/userManagement/list"
                component={UserListPage}
                onEnter={(): boolean => {return true;}}
                redirectTo="/unauthorized"
        />
    );

    it('should render correct Route or UnAuthorized component', (): void => {
        expect(authRoute.find(Route).length).toBe(1);
    });
});
