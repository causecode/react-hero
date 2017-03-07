jest.unmock('../../src/actions/alertActions');
jest.unmock('../../src/actions/confirmationModalActions');

import * as AlertActions from '../../src/actions/alertActions';
import * as ConfirmationModalActions from '../../src/actions/confirmationModalActions';
import {IGenericAction, IAlertAction} from '../../src/interfaces';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Tests for alertActions and confirmationModalActions', () => {

    const expectedAction = (type: string): IGenericAction => {
        return {
            type,
        };
    };

    unroll('should create #type action', (
        done: () => void,
        args: {action: () => IGenericAction|IAlertAction, type: string}
    ): void => {
        expect(args.action()).toEqual(expectedAction(args.type));
        done();
    }, [
        ['action', 'type'],
        [ConfirmationModalActions.showConfirmationModal, 'SHOW_CONFIRMATION_MODAL'],
        [ConfirmationModalActions.hideConfirmationModal, 'HIDE_CONFIRMATION_MODAL'],
        [AlertActions.setAlertInvisible, 'HIDE_ALERT'],
    ]);

    it('should create setAlertVisible action', (): void => {
        let result: IAlertAction = {type: 'SHOW_ALERT', payload: {alertType: 'info', alertMessage: 'Success'}};
        expect(AlertActions.setAlertVisible('info', 'Success')).toEqual(result);
    });
});
