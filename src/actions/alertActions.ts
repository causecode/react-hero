import {IGenericAction, IAlertAction} from '../interfaces';

export function setAlertVisible(type: string, message: string): IAlertAction {
    return {
        type: 'SHOW_ALERT',
        payload: {
            alertType: type,
            alertMessage: message,
        },
    };
};

export function setAlertInvisible(): IGenericAction {
    return {
        type: 'HIDE_ALERT',
    };
};
