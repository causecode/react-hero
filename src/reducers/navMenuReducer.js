"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var objectAssign = require('object-assign');
var NAV_INITIAL_STATE = {
    primaryNav: false,
    secondaryNav: false,
    primaryNavCount: 0,
    secondaryNavCount: 0,
};
function navMenuReducer(state, action) {
    if (state === void 0) { state = NAV_INITIAL_STATE; }
    var primaryNavStatus = true;
    var secondaryNavStatus = true;
    switch (action.type) {
        case constants_1.SHOW_PRIMARY_NAV:
            if (state.primaryNav || state.primaryNavCount > 1) {
                console.error('There should be only one PrimarySliderNav');
                primaryNavStatus = false;
            }
            return objectAssign({}, state, {
                primaryNav: primaryNavStatus,
                primaryNavCount: state.primaryNavCount + 1,
            });
        case constants_1.SHOW_SECONDARY_NAV:
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
exports.navMenuReducer = navMenuReducer;
