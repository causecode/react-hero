export interface INextState {
    location: {
        pathname: string;
    };
}
export declare const getUserRoles: () => string[];
export declare function hasAllRoles(roles: string[]): boolean;
export declare function hasAnyRole(roles: string[]): boolean;
export declare function isAdmin(): boolean;
export declare function isCrmManager(): boolean;
export declare function isEmployee(): boolean;
