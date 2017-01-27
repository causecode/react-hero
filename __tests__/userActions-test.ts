jest.unmock('../src/actions/userActions');

import * as actions from '../src/actions/userActions';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Tests for userActions.', () => {
    
   unroll('should create #action action', (done, args) => {
        expect(actions[args.action](args.payload)).toEqual({type: args.type, payload: args.payload});
        done();
    }, [
        ['action', 'type', 'payload'],
        ['setCheckboxChecked', 'CHECK_CHECKBOX', 1],
        ['setCheckboxUnchecked', 'UNCHECK_CHECKBOX', 1],
        ['saveUserAction', 'SAVE_USER_ACTION', 'Export Report'],
        ['saveUserActionData', 'SAVE_USER_ACTION_DATA', 20],
        ['selectAllRecordsOnPage', 'SELECT_ALL_RECORDS_ON_PAGE', true],
        ['selectAllRecords', 'SELECT_ALL_RECORDS', false]
    ]);

    unroll('should create #action action', (done, args) => {
        expect(actions[args.action]()).toEqual({type: args.type});
        done();
    }, [
        ['action', 'type'],
        ['resetUserAction', 'RESET_USER_ACTION'],
        ['resetCheckboxState', 'RESET_CHECKBOXES']
    ]);
});
