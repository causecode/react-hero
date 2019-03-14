"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MODAL_INITIAL_STATE = false;
function confirmationModalReducer(state, action) {
    if (state === void 0) { state = MODAL_INITIAL_STATE; }
    switch (action.type) {
        case 'SHOW_CONFIRMATION_MODAL':
            return true;
        case 'HIDE_CONFIRMATION_MODAL':
            return false;
        default:
            return state;
    }
}
exports.confirmationModalReducer = confirmationModalReducer;
//# sourceMappingURL=confirmationModalReducer.js.map