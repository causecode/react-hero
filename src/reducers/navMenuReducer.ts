import {INavMenuReducer} from '../interfaces';
import {SHOW_PRIMARY_NAV, SHOW_SECONDARY_NAV} from '../constants';

const NAV_INITIAL_STATE: INavMenuReducer = {
    primaryNav: false,
    secondaryNav: false,
    primaryNavCount: 0,
    secondaryNavCount: 0,
};

export function navMenuReducer(state = NAV_INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_PRIMARY_NAV:
            return {
                ...state,
                primaryNav: action.payload,
                primaryNavCount: state.primaryNavCount + 1,
            };

        case SHOW_SECONDARY_NAV:

            return {
                ...state,
                secondaryNav: action.payload,
                secondaryNavCount: state.secondaryNavCount + 1,
            };

        default:
            return state;
    }
}