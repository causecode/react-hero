jest.unmock('../../src/components/common/AuthRoute');

import * as React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {ShallowWrapper, shallow} from 'enzyme';
import {AuthRoute, IAuthRouteProps} from '../../src/components/common/AuthRoute';
import {UserListPage} from '../../src/demo/components/UserListPage';
const unroll = require<any>('unroll');

unroll.use(it);

describe('Test cases for AuthenticateRoute component', (): void => {

    const checkPermission = jest.fn();
    checkPermission.mockReturnValueOnce(true)
            .mockReturnValueOnce(false);

    let authRoute: ShallowWrapper<IAuthRouteProps, void> = shallow<IAuthRouteProps, void> (
        <AuthRoute
                path="/userManagement/list"
                component={UserListPage}
                onEnter={(): boolean => {return true;}}
                redirectTo="/unauthorized"
        />
    );

    unroll('should render correct Route or redirect to /unauthorized', (
        done: () => void,
        args: {component: React.ComponentClass<any>}
    ): void => {
        authRoute.setProps({onEnter: checkPermission});
        expect(authRoute.find(args.component).length).toBe(1);
        done();
    }, [
        ['component'],
        [Route],
        [Redirect],
    ]);
});
