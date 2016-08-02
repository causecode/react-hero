"use strict";
var actions_1 = require('../actions/actions');
function open(state, action) {
    if (state === void 0) { state = false; }
    switch (action.type) {
        case actions_1.TOGGLE_NAV:
            return !state;
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = open;
;
//# sourceMappingURL=open.js.map