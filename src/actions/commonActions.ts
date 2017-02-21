import {IGenericAction, IAlertAction} from '../interfaces';

// To show confirmation modal
export function showConfirmationModal(): IGenericAction {
    return {
        type: 'SHOW_CONFIRMATION_MODAL'
    };
}

// To hide confirmation modal
export function hideConfirmationModal(): IGenericAction {
    return {
        type: 'HIDE_CONFIRMATION_MODAL'
    };
}

// To show success or failure alert
export function setAlertVisible(type: string, message: string): IAlertAction {
    return {
        type: 'SHOW_ALERT',
        payload: {
            alertType: type,
            alertMessage: message
        }
    };
};

// To hide success or failure alert
export function setAlertInvisible(): IGenericAction {
    return {
        type: 'HIDE_ALERT'
    };
};
