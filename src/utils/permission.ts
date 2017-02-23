import {store} from '../store';
import {LocationDescriptor} from '~react-router~history';

export interface INextState {
    location: {
        pathname: string
    };
}

export const getUserRoles = (): string[] => {
    return store.getState().currentUser.toJS().userData.roles;
};

export function hasAllRoles(roles: string[]): boolean {
    let currentUserRoles: string[] = getUserRoles();

    return roles.every((role: string): boolean => {
        return (currentUserRoles.indexOf(role.trim()) > -1);
    });
}

export function hasAnyRole(roles: string[]): boolean {
    let currentUserRoles: string[] = getUserRoles();

    return roles.some((role: string): boolean => {
        return (currentUserRoles.indexOf(role.trim()) > -1);
    });
}

export function isAdmin(nextState: INextState, replace: (location: LocationDescriptor) => void): void {
    if (!hasAnyRole(['ROLE_ADMIN'])) {
        replace({
            pathname: '/unauthorized',
            state: {nextPathname: nextState.location.pathname}
        });
    }
}

export function isCrmManager(nextState: INextState, replace: (location: LocationDescriptor) => void): void {
    if (!hasAnyRole(['ROLE_ADMIN', 'ROLE_CRM_MANAGER', 'ROLE_CRM_USER'])) {
        replace({
            pathname: '/unauthorized',
            state: {nextPathname: nextState.location.pathname}
        });
    }
}
