"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
function primaryNavReducer(state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case constants_1.TOGGLE_NAV:
            return !state;
        default:
            return state;
    }
}
exports.primaryNavReducer = primaryNavReducer;
//# sourceMappingURL=primaryNavReducer.js.map