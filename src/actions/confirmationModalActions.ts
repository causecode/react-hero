import {IGenericAction} from '../interfaces';

export function showConfirmationModal(): IGenericAction {
    return {
        type: 'SHOW_CONFIRMATION_MODAL',
    };
}

export function hideConfirmationModal(): IGenericAction {
    return {
        type: 'HIDE_CONFIRMATION_MODAL',
    };
}
