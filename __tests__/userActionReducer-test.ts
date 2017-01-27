jest.unmock('../src/reducers/userActionReducer');

import {userActionReducer} from '../src/reducers/userActionReducer';
import {IUserActionReducer, IBulkUserActions} from '../src/interfaces';

describe('Test cases for userActionReducer', () => {
    
    let INITIAL_STATE: IUserActionReducer = {action: '--User Action--', records: 0};

    it('should return initial state for first time', () => {
        expect(userActionReducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });

    function getAction(type: string, payload: string|number): IBulkUserActions {
        return {
            type,
            payload
        };
    }

    it('should save selected user action', () => {
        let result: IUserActionReducer = userActionReducer(INITIAL_STATE, getAction('SAVE_USER_ACTION', 'Delete User'));
        expect(result).toEqual({action: 'Delete User', records: 0});
    });

    it('should save number of selected records', () => {
        let result: IUserActionReducer = userActionReducer(INITIAL_STATE, getAction('SAVE_USER_ACTION_DATA', 10));
        expect(result).toEqual({action: '--User Action--', records: 10});
    });

    it('should reset selected user action', () => {
        let interMediateState: IUserActionReducer = {action: 'Delete User', records: 10};
        expect(userActionReducer(interMediateState, {type: 'RESET_USER_ACTION'})).toEqual(INITIAL_STATE);
    });
});
