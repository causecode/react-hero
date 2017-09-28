"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectAssign = require('object-assign');
var INITIAL_STATE = { selectedIds: [], selectAll: false, selectAllOnPage: false };
function checkboxReducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case 'CHECK_CHECKBOX':
            var list = state.selectedIds;
            return objectAssign({}, state, { selectedIds: list.concat([action.payload]) });
        case 'UNCHECK_CHECKBOX':
            var checkedList = state.selectedIds;
            var index = checkedList.indexOf(action.payload);
            if (index !== -1) {
                return objectAssign({}, state, { selectedIds: checkedList.slice(0, index).concat(checkedList.slice(index + 1)) });
            }
            break;
        case 'SELECT_ALL_RECORDS_ON_PAGE':
            return objectAssign({}, state, { selectAllOnPage: action.payload });
        case 'SELECT_ALL_RECORDS':
            return objectAssign({}, state, { selectAll: action.payload });
        case 'RESET_CHECKBOXES':
            return INITIAL_STATE;
        default:
            return state;
    }
}
exports.checkboxReducer = checkboxReducer;
;
//# sourceMappingURL=checkboxReducers.js.map