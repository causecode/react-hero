jest.unmock('../../src/reducers/alertReducer');

import {alertReducer} from '../../src/reducers/alertReducer';
import {IGenericAction, IAlertAction, IAlertType} from '../../src/interfaces';

const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test cases for alertReducer', () => {

    let INITIAL_STATE: IAlertType = {show: false, type: '', message: ''};

    it('should return initial state for first time', () => {
        expect(alertReducer(INITIAL_STATE, {type: '', payload: {alertType: '', alertMessage: ''}}))
                .toEqual(INITIAL_STATE);
    });

    function getShowAlertAction(type: string, message: string): IAlertAction {
        return {
            type: 'SHOW_ALERT',
            payload: {
                alertType: type,
                alertMessage: message,
            },
        };
    }

    function getHideAlertAction(): IGenericAction {
        return {
            type: 'HIDE_ALERT',
        };
    }

    unroll('should #alertVisibility alert', (
        done: () => void,
        args: {alertVisibility: string, alertAction: IAlertAction, result: IAlertAction}
    ): void => {
        let result: IAlertType = alertReducer(INITIAL_STATE, args.alertAction);
        expect(result).toEqual(args.result);
        done();
    }, [
        ['alertVisibility', 'alertAction', 'result'],
        ['display', getShowAlertAction('info', 'Success'), {show: true, type: 'info', message: 'Success'}],
        ['hide',  getHideAlertAction(), {show: false, type: '', message: ''}],
    ]);
});
