"use strict";
var actions_1 = require("../actions/actions");
exports.toggle = function (state, action) {
    if (action.type == actions_1.TOGGLE_NAV) {
        return { open: !state.open };
    }
    return state;
};
//# sourceMappingURL=reducers.js.map