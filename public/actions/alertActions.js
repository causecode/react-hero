"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setAlertVisible(type, message) {
    return {
        type: 'SHOW_ALERT',
        payload: {
            alertType: type,
            alertMessage: message,
        },
    };
}
exports.setAlertVisible = setAlertVisible;
;
function setAlertInvisible() {
    return {
        type: 'HIDE_ALERT',
    };
}
exports.setAlertInvisible = setAlertInvisible;
;
//# sourceMappingURL=alertActions.js.map