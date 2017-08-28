"use strict";
var constants_1 = require("../constants");
function secondaryNavReducer(state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case constants_1.TOGGLE_SECONDARY_NAV:
            return !state;
        default:
            return state;
    }
}
exports.secondaryNavReducer = secondaryNavReducer;
//# sourceMappingURL=secondaryNavReducer.js.map