"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toggleCheckbox(type, id) {
    return {
        type: type,
        payload: id,
    };
}
exports.toggleCheckbox = toggleCheckbox;
function selectAllRecords(type, checked) {
    return {
        type: type,
        payload: checked,
    };
}
exports.selectAllRecords = selectAllRecords;
function resetCheckboxState() {
    return {
        type: 'RESET_CHECKBOXES',
    };
}
exports.resetCheckboxState = resetCheckboxState;
//# sourceMappingURL=checkboxActions.js.map