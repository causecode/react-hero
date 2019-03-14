"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectAssign = require('object-assign');
var USER_ACTION = '--User Action--';
var INITIAL_STATE = { action: USER_ACTION, records: 0 };
function userReducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case 'SAVE_USER_ACTION':
            return objectAssign({}, state, { action: action.payload });
        case 'SAVE_USER_ACTION_DATA':
            return objectAssign({}, state, { records: action.payload });
        case 'RESET_USER_ACTION':
            return INITIAL_STATE;
        default:
            return state;
    }
}
exports.userReducer = userReducer;
//# sourceMappingURL=userReducer.js.map