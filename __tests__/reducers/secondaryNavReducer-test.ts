jest.unmock('../../src/reducers/secondaryNavReducer');

import {secondaryNavReducer} from '../../src/reducers/secondaryNavReducer';
import {TOGGLE_SECONDARY_NAV} from '../../src/constants';
import {IGenericAction} from '../../src/interfaces';
const unroll: any = require('unroll');

unroll.use(it);

describe('secondaryNavReducer tests.', (): void => {

    let INITIAL_STATE: boolean = false;

    function getModalAction(type: string): IGenericAction {
        return {
            type,
        };
    }

    it('should hide the secondary navigation drawer while initializing the reducer.', (): void => {
        expect(secondaryNavReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    unroll('It should #navbarVisibility the secondary navbar when action is received with #title.', (
        done: () => void,
        args: {title: string, navbarVisibility: string, actionType: string, result: boolean}
    ): void => {
        expect(secondaryNavReducer(INITIAL_STATE, getModalAction(args.actionType))).toEqual(args.result);
        done();
    }, [
        ['title', 'navbarVisibility', 'actionType', 'result'],
        ['the type TOGGLE_SECONDARY_NAV', 'display', TOGGLE_SECONDARY_NAV, true],
        ['any other type', 'hide', 'DUMMY_ACTION_TYPE', false],
    ]);
});
