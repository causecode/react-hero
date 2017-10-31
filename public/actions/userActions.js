"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resetUserAction() {
    return {
        type: 'RESET_USER_ACTION',
    };
}
exports.resetUserAction = resetUserAction;
function saveUserAction(action) {
    return {
        type: 'SAVE_USER_ACTION',
        payload: action,
    };
}
exports.saveUserAction = saveUserAction;
function saveUserActionData(records) {
    return {
        type: 'SAVE_USER_ACTION_DATA',
        payload: records,
    };
}
exports.saveUserActionData = saveUserActionData;
//# sourceMappingURL=userActions.js.map