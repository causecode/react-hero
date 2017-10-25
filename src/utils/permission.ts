import {store} from '../store';

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

export function isAdmin(): boolean {
    if (!hasAnyRole(['ROLE_ADMIN'])) {
        return false;
    }

    return true;
}

export function isCrmManager(): boolean {
    if (!hasAnyRole(['ROLE_ADMIN', 'ROLE_CRM_MANAGER', 'ROLE_CRM_USER'])) {
        return false;
    }

    return true;
}

export function isEmployee(): boolean {
    if (!hasAnyRole(['ROLE_EMPLOYEE', 'ROLE_EMPLOYEE_MANAGER', 'ROLE_CONTENT_MANAGER', 'ROLE_CRM_USER', 'ROLE_USER'])) {
        return false;
    }

    return true;
}

export function isJobBoardManager(): boolean {
    if (!hasAnyRole(['ROLE_ADMIN', 'ROLE_JOB_BOARD_MANAGER', 'ROLE_HR', 'ROLE_HR_ADMIN'])) {
        return false;
    }

    return true;
}
