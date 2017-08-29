"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
function open(state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case constants_1.TOGGLE_NAV:
            return !state;
        default:
            return state;
    }
}
exports.open = open;
;
