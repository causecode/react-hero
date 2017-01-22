jest.unmock('../src/reducers/checkboxReducers');

import {checkboxReducer} from '../src/reducers/checkboxReducers';
import {ICheckboxReducer} from '../src/interfaces/index';

describe('Test cases for userActionReducer', () => {
    
    let INITIAL_STATE: ICheckboxReducer = {selectedIds: [], selectAll: false, selectAllOnPage: false};

    it('should return initial state for first time', () => {
        expect(checkboxReducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });

    function getAction(type: string, payload: number|boolean) {
        return {
            type,
            payload
        };
    }

    it('should satisfy SAVE_CHECKBOX_ID and CLEAR_CHECKBOX_ID case', () => {
        let result: ICheckboxReducer = checkboxReducer(INITIAL_STATE, getAction('SAVE_CHECKBOX_ID', 1));
        expect(result).toEqual({selectedIds: [1], selectAll: false, selectAllOnPage: false});

        result = checkboxReducer(result, getAction('CLEAR_CHECKBOX_ID', 1));
        expect(result).toEqual({selectedIds: [], selectAll: false, selectAllOnPage: false});
    });

    it('should satisfy SELECT_ALL_RECORDS_ON_PAGE case', () => {
        let result: ICheckboxReducer = checkboxReducer(INITIAL_STATE, 
                getAction('SELECT_ALL_RECORDS_ON_PAGE', true));
        expect(result).toEqual({selectedIds: [], selectAll: false, selectAllOnPage: true});
    });

    it('should satisfy SELECT_ALL_RECORDS case', () => {
        let result: ICheckboxReducer = checkboxReducer(INITIAL_STATE, 
                getAction('SELECT_ALL_RECORDS', true));
        expect(result).toEqual({selectedIds: [], selectAll: true, selectAllOnPage: false});
    });

     it('should satisfy RESET_CHECKBOX_STATE case', () => {
         let interMediateState: ICheckboxReducer = {selectedIds: [1, 2, 3], selectAllOnPage: false, selectAll: false};
        expect(checkboxReducer(interMediateState, {type: 'RESET_CHECKBOX_STATE'})).toEqual(INITIAL_STATE);
    });
});
