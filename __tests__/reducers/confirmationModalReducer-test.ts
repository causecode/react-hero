jest.unmock('../../src/reducers/confirmationModalReducer');

import {IGenericAction} from '../../src/interfaces';
import {confirmationModalReducer} from '../../src/reducers/confirmationModalReducer';

const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test cases for confirmationModalReducer', () => {

    let INITIAL_STATE: boolean = false;

    it('should return initial state for first time', () => {
        expect(confirmationModalReducer(INITIAL_STATE, {type: ''})).toEqual(INITIAL_STATE);
    });

    function getModalAction(type: string): IGenericAction {
        return {
            type,
        };
    }

    unroll('should #modalVisibility confirmaton modal', (
        done: () => void,
        args: {modalVisibility: string, action: string, result: boolean}
    ): void => {
        let result: boolean = confirmationModalReducer(INITIAL_STATE, getModalAction(args.action));
        expect(result).toEqual(args.result);
        done();
    }, [
        ['modalVisibility', 'action', 'result'],
        ['display', 'SHOW_CONFIRMATION_MODAL', true],
        ['hide',  'HIDE_CONFIRMATION_MODAL', false],
    ]);
});
