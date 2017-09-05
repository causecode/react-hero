jest.unmock('../../src/reducers/navMenuReducer');

import {navMenuReducer} from '../../src/reducers/navMenuReducer';
import {INavMenuReducer} from '../../src/interfaces';
import * as types from '../../src/constants';

describe('navMenuReducer Test', (): void => {
    let NAV_INITIAL_STATE: INavMenuReducer = {
        primaryNav: false,
        secondaryNav: false,
        primaryNavCount: 0,
        secondaryNavCount: 0,
    };
    it('should return the initial state', (): void => {
        expect(navMenuReducer(undefined, {})).toEqual(NAV_INITIAL_STATE);
    });
    it('should handle SHOW_PRIMARY_NAV', (): void => {
        expect(navMenuReducer(NAV_INITIAL_STATE, {
                type: types.SHOW_PRIMARY_NAV,
                payload: true
            })
        ).toEqual(
            {
                primaryNav: true,
                secondaryNav: false,
                primaryNavCount: 1,
                secondaryNavCount: 0,
            }
        );
    });
    it('should handle SHOW_SECONDARY_NAV', (): void => {
        expect(navMenuReducer(NAV_INITIAL_STATE, {
                type: types.SHOW_SECONDARY_NAV,
                payload: true,
            })
        ).toEqual(
            {
                primaryNav: false,
                secondaryNav: true,
                primaryNavCount: 0,
                secondaryNavCount: 1,
            }
        );
    });
});
