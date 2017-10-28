import {IUserReducer} from '../interfaces';
const objectAssign = require<any>('object-assign');
const USER_ACTION: string = '--User Action--';
let INITIAL_STATE: IUserReducer = {action: USER_ACTION, records: 0};

export function userReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SAVE_USER_ACTION':
            return objectAssign({}, state, {action: action.payload});

        case 'SAVE_USER_ACTION_DATA':
            return objectAssign({}, state, {records: action.payload});

        case 'RESET_USER_ACTION':
            return INITIAL_STATE;

        default:
            return state;
    }
}
