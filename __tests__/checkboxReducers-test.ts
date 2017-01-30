jest.unmock('../src/reducers/checkboxReducers');

import {checkboxReducer} from '../src/reducers/checkboxReducers';
import {ICheckboxReducer, ICheckboxReducerAction} from '../src/interfaces';

const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test cases for checkboxReducer', () => {
    
    let INITIAL_STATE: ICheckboxReducer = {selectedIds: [], selectAll: false, selectAllOnPage: false};

    it('should return initial state for first time', () => {
        expect(checkboxReducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });

    function getAction(type: string, payload: number|boolean): ICheckboxReducerAction {
        return {
            type,
            payload
        };
    }

    it('should select and clear checkbox with given ID', () => {
        let result: ICheckboxReducer = checkboxReducer(INITIAL_STATE, getAction('CHECK_CHECKBOX', 1));
        expect(result).toEqual({selectedIds: [1], selectAll: false, selectAllOnPage: false});

        result = checkboxReducer(result, getAction('CHECK_CHECKBOX', 2));
        expect(result).toEqual({selectedIds: [1, 2], selectAll: false, selectAllOnPage: false});

        result = checkboxReducer(result, getAction('UNCHECK_CHECKBOX', 2));
        expect(result).toEqual({selectedIds: [1], selectAll: false, selectAllOnPage: false});
    });

    it('should uncheck all checkboxes', () => {
        let interMediateState: ICheckboxReducer = {selectedIds: [1, 2, 3], selectAllOnPage: false, selectAll: false};
        expect(checkboxReducer(interMediateState, {type: 'RESET_CHECKBOXES'})).toEqual(INITIAL_STATE);
    });

    unroll('should retun the expected nextState after dispatching #action', (done, args) => {
        let result: ICheckboxReducer = checkboxReducer(INITIAL_STATE, getAction(args.action, true));
        expect(result).toEqual(args.nextState);
        done();
    }, [
        ['action', 'nextState'],
        ['SELECT_ALL_RECORDS_ON_PAGE', {selectedIds: [], selectAll: false, selectAllOnPage: true}],
        ['SELECT_ALL_RECORDS', {selectedIds: [], selectAll: true, selectAllOnPage: false}]
    ]);
});
