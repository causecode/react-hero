jest.unmock('../../src/actions/navMenuAction');

import * as navMenuAction from '../../src/actions/navMenuAction';
import * as types from '../../src/constants';

describe('Tests for navMenuAction', (): void => {
    it('should create SHOW_PRIMARY_NAV action', (): void => {
        let visibilityStatus = true;
        let expectedAction = {
            type: types.SHOW_PRIMARY_NAV,
            payload: visibilityStatus,
        };
        expect(navMenuAction.showPrimaryNav(true)).toEqual(expectedAction);
    });
    it('should create SHOW_SECONDARY_NAV action', (): void => {
        let visibilityStatus = true;
        let expectedAction = {
            type: types.SHOW_SECONDARY_NAV,
            payload: visibilityStatus,
        };
        expect(navMenuAction.showSecondaryNav(true)).toEqual(expectedAction);
    });
});
