jest.unmock('../src/utils/permission');
jest.unmock('immutable');

import {getUserRoles, hasAllRoles, hasAnyRole, isAdmin, isCrmManager} from '../src/utils/permission';
import {Iterable} from 'immutable';
import {store} from '../src/store';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for permission.ts', (): void => {

    describe('When the getUserRoles is called,', (): void => {

        beforeEach((): void => {
            store.getState = jest.fn(() => {
                return {currentUser: Iterable({userData: {roles: ['ROLE_USER']}})};
            });
        });

        it('It should return the list of roles assigned to the current user. ', (): void => {
            expect(getUserRoles()).toEqual(['ROLE_USER']);
        });
    });

    describe('Checking if the current user has the required roles.', (): void => {
        beforeEach((): void => {
            getUserRoles = jest.fn((): string[] => {
                return ['ROLE_USER', 'ROLE_MANAGER'];
            });
        });
        
        unroll('It should return #result if the user #case all the required roles.', (
                done: () => void,
                args: {case: string, param: string[], result: boolean}
        ): void => {
            expect(hasAllRoles(args.param)).toEqual(args.result);
            done();
        }, [
            ['case', 'param', 'result'],
            ['has', ['ROLE_USER', 'ROLE_ADMIN'], false],
            ['does not have', ['ROLE_USER', 'ROLE_MANAGER'], true]
        ]);

        unroll('It should return #result if the user #case any one of required roles.', (
                done: () => void,
                args: {case: string, param: string[], result: boolean}
        ): void => {
            expect(hasAnyRole(args.param)).toEqual(args.result);
            done();
        }, [
            ['case', 'param', 'result'],
            ['has', ['ROLE_USER', 'ROLE_ADMIN'], true],
            ['does not have', ['ROLE_CRM_USER'], false]
        ]);
    });

    describe('When the user is not authorized,', (): void => {

        let replace: jest.Mock<void> = jest.fn<void>((path: string) => {});
        beforeEach((): void => {
            hasAnyRole = jest.fn((): boolean => {
                return false;
            });
        });

        unroll('It should call the replace function to change the route when the user is not #title.', (
            done: () => void,
            args: {title: string, functionName: Function}
        ): void => {
            args.functionName({location: {pathname: '/'}}, replace);
            expect(replace).toBeCalled();
            done();
        }, [
            ['title', 'functionName'],
            ['an admin', isAdmin],
            ['a crm manager', isCrmManager]
        ]);
    });
});
