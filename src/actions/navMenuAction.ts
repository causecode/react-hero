import {IUserAction} from '../interfaces';

export const showPrimaryNav = (visibilityStatus: boolean): IUserAction => {
    return {
        type: 'SHOW_PRIMARY_NAV',
        payload: visibilityStatus,
    };
};

export const showSecondaryNav = (visibilityStatus: boolean): IUserAction => {
    return {
        type: 'SHOW_SECONDARY_NAV',
        payload: visibilityStatus,
    };
};
