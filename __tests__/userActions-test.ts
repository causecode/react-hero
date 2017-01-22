jest.unmock('../src/actions/userActions');

import * as actions from '../src/actions/userActions';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Tests for userActions.', () => {
    
   unroll('should create #action action', (done, testArgs) => {
        expect(actions[testArgs.function](testArgs.payload)).toEqual({type: testArgs.type, payload: testArgs.payload});
        done();
    }, [
        ['action', 'function', 'type', 'payload'],
        ['setCheckboxChecked', 'setCheckboxChecked', 'SAVE_CHECKBOX_ID', 1],
        ['setCheckboxUnchecked', 'setCheckboxUnchecked', 'CLEAR_CHECKBOX_ID', 1],
        ['saveUserAction', 'saveUserAction', 'SAVE_USER_ACTION', 'Export Report'],
        ['saveUserActionData', 'saveUserActionData', 'SAVE_USER_ACTION_DATA', 20],
        ['selectAllRecordsOnPage', 'selectAllRecordsOnPage', 'SELECT_ALL_RECORDS_ON_PAGE', true],
        ['selectAllRecords', 'selectAllRecords',  'SELECT_ALL_RECORDS', false]
    ]);

    unroll('should create #action action', (done, testArgs) => {
        expect(actions[testArgs.function]()).toEqual({type: testArgs.type});
        done();
    }, [
        ['action', 'function', 'type'],
        ['resetUserAction', 'resetUserAction', 'RESET_USER_ACTION'],
        ['resetCheckboxState', 'resetCheckboxState',  'RESET_CHECKBOX_STATE']
    ]);
});
