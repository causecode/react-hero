import {IAlertAction, IAlertType} from '../interfaces';

let ALERT_INITIAL_STATE: IAlertType = {show: false, type: '', message: ''};

export function alertReducer(state: IAlertType = ALERT_INITIAL_STATE, action: IAlertAction): IAlertType {
    switch (action.type) {
        case 'SHOW_ALERT':
            return {show: true, type: action.payload.alertType, message: action.payload.alertMessage};

        case 'HIDE_ALERT':
            return {show: false, type: '', message: ''};

        default:
            return state;
    }
};
