jest.unmock('../src/reducers/open');

import {open} from '../src/reducers/open';
import {TOGGLE_NAV} from '../src/constants';

describe('open reducer test cases.', () => {
    it('should return the initial value when empty action is passed.', () => {
        expect(open(false, {})).toBeFalsy();
        expect(open(true, {})).toBeTruthy();
    });

    it('should handle Toggle Nav.', () => {
        let testAction: {type: string} = {type: TOGGLE_NAV};
        expect(open(true, testAction)).toBeFalsy();
        expect(open(false, testAction)).toBeTruthy();
    });
});