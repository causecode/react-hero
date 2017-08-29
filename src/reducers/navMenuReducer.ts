import {INavMenuReducer} from '../interfaces';
import {SHOW_PRIMARY_NAV, SHOW_SECONDARY_NAV} from '../constants';

const objectAssign = require<any>('object-assign');

const NAV_INITIAL_STATE: INavMenuReducer = {
    primaryNav: false,
    secondaryNav: false,
};

export function navMenuReducer(state = NAV_INITIAL_STATE, action) {
    switch (action.type) {
        case SHOW_PRIMARY_NAV:
            return objectAssign({}, state, {
                primaryNav: true,
            });

        case SHOW_SECONDARY_NAV:
            return objectAssign({}, state, {
                secondaryNav: true,
            });

        default:
            return state;
    }
}
