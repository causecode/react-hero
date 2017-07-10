"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ALERT_INITIAL_STATE = { show: false, type: '', message: '' };
function alertReducer(state, action) {
    if (state === void 0) { state = ALERT_INITIAL_STATE; }
    switch (action.type) {
        case 'SHOW_ALERT':
            return { show: true, type: action.payload.alertType, message: action.payload.alertMessage };
        case 'HIDE_ALERT':
            return { show: false, type: '', message: '' };
        default:
            return state;
    }
}
exports.alertReducer = alertReducer;
;
//# sourceMappingURL=alertReducer.js.map