import {INavMenuReducer} from '../interfaces';
import {SHOW_PRIMARY_NAV, SHOW_SECONDARY_NAV} from '../constants';

const objectAssign = require<any>('object-assign');

const NAV_INITIAL_STATE: INavMenuReducer = {
    primaryNav: false,
    secondaryNav: false,
    primaryNavCount: 0,
    secondaryNavCount: 0,
};

export function navMenuReducer(state = NAV_INITIAL_STATE, action) {
    let primaryNavStatus: boolean = true;
    let secondaryNavStatus: boolean = true;
    switch (action.type) {
        case SHOW_PRIMARY_NAV:
            if (state.primaryNav || state.primaryNavCount > 1) {
                console.error('There should be only one PrimarySliderNav');
                primaryNavStatus = false;
            }
            return objectAssign({}, state, {
                primaryNav: primaryNavStatus,
                primaryNavCount: state.primaryNavCount + 1,
            });

        case SHOW_SECONDARY_NAV:
            if (state.secondaryNav || state.secondaryNavCount > 1) {
                console.error('There should be only one PrimarySliderNav');
                secondaryNavStatus = false;
            }
            return objectAssign({}, state, {
                secondaryNav: secondaryNavStatus,
                secondaryNavCount: state.secondaryNavCount + 1,
            });

        default:
            return state;
    }
}
