const objectAssign = require<any>('object-assign');

let INITIAL_STATE = {selectedIds: [], selectAll: false, selectAllOnPage: false};

export function checkboxReducer(state = INITIAL_STATE, action) {
    switch (action.type) {        
        case 'SAVE_CHECKBOX_ID':
            let list: number[] = state.selectedIds;
            return objectAssign({}, state, {selectedIds: [...list, action.payload]});

        case 'CLEAR_CHECKBOX_ID':
            let checkedList: number[] = state.selectedIds;
            let index: number = checkedList.indexOf(action.payload);
            if (index !== -1) {
                return objectAssign({}, state, {selectedIds: [
                    ...checkedList.slice(0, index),
                    ...checkedList.slice(index + 1)
                ]});
            }

        case 'SELECT_ALL_RECORDS_ON_PAGE': 
            return objectAssign({}, state, {selectAllOnPage: action.payload.checked});
        
        case 'SELECT_ALL_RECORDS': 
            return objectAssign({}, state, {selectAll: action.payload.checked});

        case 'RESET_CHECKBOX_STATE': 
            return objectAssign({}, state, {selectedIds: [], selectAll: false, selectAllOnPage: false});
            
        default:
            return state;
    } 
};
