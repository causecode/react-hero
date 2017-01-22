jest.unmock('../src/reducers/userActionReducer');

import {userActionReducer} from '../src/reducers/userActionReducer';
import {IUserActionReducer} from '../src/interfaces/index';

describe('Test cases for userActionReducer', () => {
    
    let INITIAL_STATE: IUserActionReducer = {action: '--User Action--', records: 0};

    it('should return initial state for first time', () => {
        expect(userActionReducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });

    function getAction(type: string, payload: string|number) {
        return {
            type,
            payload
        };
    }

    it('should satisfy SAVE_USER_ACTION case', () => {
        let result: IUserActionReducer = userActionReducer(INITIAL_STATE, getAction('SAVE_USER_ACTION', 'Delete User'));
        expect(result).toEqual({action: 'Delete User', records: 0});
    });

    it('should satisfy SAVE_USER_ACTION_DATA case', () => {
        let result: IUserActionReducer = userActionReducer(INITIAL_STATE, getAction('SAVE_USER_ACTION_DATA', 10));
        expect(result).toEqual({action: '--User Action--', records: 10});
    });

    it('should satisfy RESET_USER_ACTION case', () => {
        let interMediateState: IUserActionReducer = {action: 'Delete User', records: 10};
        expect(userActionReducer(interMediateState, {type: 'RESET_USER_ACTION'})).toEqual(INITIAL_STATE);
    });
});
