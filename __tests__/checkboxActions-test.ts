jest.unmock('../src/actions/checkboxActions');

import * as actions from '../src/actions/checkboxActions';
import {CHECK_CHECKBOX, UNCHECK_CHECKBOX, SELECT_ALL_RECORDS_ON_PAGE, SELECT_ALL_RECORDS} from '../src/constants';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Tests for checkboxActions.', () => {
    
   unroll('should create #action of type #type', (done, args) => {
        expect(actions[args.action](args.type, args.payload)).toEqual({type: args.type, payload: args.payload});
        done();
    }, [
        ['action', 'type', 'payload'],
        ['toggleCheckbox', CHECK_CHECKBOX, 1],
        ['toggleCheckbox', UNCHECK_CHECKBOX, 1],
        ['selectAllRecords', SELECT_ALL_RECORDS_ON_PAGE, true],
        ['selectAllRecords', SELECT_ALL_RECORDS, false]
    ]);

    it('should create resetCheckboxState action', () => {
        expect(actions.resetCheckboxState()).toEqual({type: 'RESET_CHECKBOXES'});
    });
});
