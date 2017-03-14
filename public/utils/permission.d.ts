import { LocationDescriptor } from '~react-router~history';
export interface INextState {
    location: {
        pathname: string;
    };
}
export declare const getUserRoles: () => string[];
export declare function hasAllRoles(roles: string[]): boolean;
export declare function hasAnyRole(roles: string[]): boolean;
export declare function isAdmin(nextState: INextState, replace: (location: LocationDescriptor) => void): void;
export declare function isCrmManager(nextState: INextState, replace: (location: LocationDescriptor) => void): void;
export declare function isEmployee(nextState: INextState, replace: (location: LocationDescriptor) => void): void;
