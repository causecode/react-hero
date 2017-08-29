"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var objectAssign = require('object-assign');
var NAV_INITIAL_STATE = {
    primaryNav: false,
    secondaryNav: false,
};
function navMenuReducer(state, action) {
    if (state === void 0) { state = NAV_INITIAL_STATE; }
    switch (action.type) {
        case constants_1.SHOW_PRIMARY_NAV:
            return objectAssign({}, state, {
                primaryNav: true,
            });
        case constants_1.SHOW_SECONDARY_NAV:
            return objectAssign({}, state, {
                secondaryNav: true,
            });
        default:
            return state;
    }
}
exports.navMenuReducer = navMenuReducer;
