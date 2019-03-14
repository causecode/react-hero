"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var NAV_INITIAL_STATE = {
    primaryNav: false,
    secondaryNav: false,
    primaryNavCount: 0,
    secondaryNavCount: 0,
};
function navMenuReducer(state, action) {
    if (state === void 0) { state = NAV_INITIAL_STATE; }
    switch (action.type) {
        case constants_1.SHOW_PRIMARY_NAV:
            return __assign({}, state, { primaryNav: action.payload, primaryNavCount: state.primaryNavCount + 1 });
        case constants_1.SHOW_SECONDARY_NAV:
            return __assign({}, state, { secondaryNav: action.payload, secondaryNavCount: state.secondaryNavCount + 1 });
        default:
            return state;
    }
}
exports.navMenuReducer = navMenuReducer;
//# sourceMappingURL=navMenuReducer.js.map