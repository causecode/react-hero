jest.unmock('../src/reducers/userReducer');

import {userReducer} from '../src/reducers/userReducer';
import {IUserReducer, IBulkUserActions} from '../src/interfaces';

const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test cases for userReducer', () => {
    
    let INITIAL_STATE: IUserReducer = {action: '--User Action--', records: 0};

    it('should return initial state for first time', () => {
        expect(userReducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });

    function getAction(type: string, payload: string|number): IBulkUserActions {
        return {
            type,
            payload
        };
    }

    it('should reset selected user action', () => {
        let interMediateState: IUserReducer = {action: 'Delete User', records: 10};
        expect(userReducer(interMediateState, {type: 'RESET_USER_ACTION'})).toEqual(INITIAL_STATE);
    });

    unroll('should retun the expected nextState after dispatching #action', (done, args) => {
        let result: IUserReducer = userReducer(INITIAL_STATE, getAction(args.action, args.payload));
        expect(result).toEqual(args.nextState);
        done();
    }, [
        ['action', 'payload', 'nextState'],
        ['SAVE_USER_ACTION', 'Delete User', {action: 'Delete User', records: 0}],
        ['SAVE_USER_ACTION_DATA', 10, {action: '--User Action--', records: 10}]
    ]);
});
