import {store} from '../store';
import {LocationDescriptor} from '~react-router-redux~history/history';

export interface INextState {
    location: {
        pathname: string
    };
}

export const getUserRoles = (): string[] => {
    let userRoles: string[] = store.getState().currentUser.toJS().userRoles;
    return userRoles || null;
};

export function hasAllRoles(roles: string[]): boolean {
    let currentUserRoles: string[] = getUserRoles();

    if (currentUserRoles) {
        return roles.every((role: string): boolean => {
            return (currentUserRoles.indexOf(role.trim()) > -1);
        });
    }

    return false;
}

export function hasAnyRole(roles: string[]): boolean {
    let currentUserRoles: string[] = getUserRoles();

    if (currentUserRoles) {
        return roles.some((role: string): boolean => {
            return (currentUserRoles.indexOf(role.trim()) > -1);
        });
    }

    return false;
}

export function isAdmin(nextState: INextState, replace: (location: LocationDescriptor) => void): void {
    if (!hasAnyRole(['ROLE_ADMIN'])) {
        replace({
            pathname: '/unauthorized',
            state: {nextPathname: nextState.location.pathname},
        });
    }
}

export function isCrmManager(nextState: INextState, replace: (location: LocationDescriptor) => void): void {
    if (!hasAnyRole(['ROLE_ADMIN', 'ROLE_CRM_MANAGER', 'ROLE_CRM_USER'])) {
        replace({
            pathname: '/unauthorized',
            state: {nextPathname: nextState.location.pathname},
        });
    }
}

export function isEmployee(nextState: INextState, replace: (location: LocationDescriptor) => void): void {
    if (!hasAnyRole(['ROLE_EMPLOYEE', 'ROLE_EMPLOYEE_MANAGER', 'ROLE_CONTENT_MANAGER', 'ROLE_CRM_USER', 'ROLE_USER'])) {
        replace({
            pathname: '/unauthorized',
            state: {nextPathname: nextState.location.pathname},
        });
    }
}
