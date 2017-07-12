import {ICheckboxReducer} from '../interfaces';
const objectAssign = require<any>('object-assign');

let INITIAL_STATE: ICheckboxReducer = {selectedIds: [], selectAll: false, selectAllOnPage: false};

export function checkboxReducer(state = INITIAL_STATE, action) {
    switch (action.type) {        
        case 'CHECK_CHECKBOX':
            let list: number[] = state.selectedIds;
            return objectAssign({}, state, {selectedIds: [...list, action.payload]});

        case 'UNCHECK_CHECKBOX':
            let checkedList: number[] = state.selectedIds;
            let index: number = checkedList.indexOf(action.payload);
            if (index !== -1) {
                return objectAssign({}, state, {selectedIds: [
                    ...checkedList.slice(0, index),
                    ...checkedList.slice(index + 1),
                ]});
            }
            break;

        case 'SELECT_ALL_RECORDS_ON_PAGE':
            return objectAssign({}, state, {selectAllOnPage: action.payload});
        
        case 'SELECT_ALL_RECORDS':
            return objectAssign({}, state, {selectAll: action.payload});

        case 'RESET_CHECKBOXES':
            return INITIAL_STATE;
            
        default:
            return state;
    } 
};
