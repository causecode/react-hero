export const TOGGLE_NAV: string = 'TOGGLE_NAV';
export const SET_PAGE: string = 'SET_PAGE';

export const toggleNav = (): {type: string} => {
    return {
        type: TOGGLE_NAV
    };
};
