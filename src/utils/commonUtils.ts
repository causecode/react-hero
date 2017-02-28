import {store} from '../store';
import {setAlertVisible, setAlertInvisible} from '../actions/alertActions';
import {hideConfirmationModal, showConfirmationModal} from '../actions/confirmationModalActions';

export function showModal(): void {
    store.dispatch(showConfirmationModal());
};

export function hideModal(): void {
    store.dispatch(hideConfirmationModal());
};

export function showAlert(type: string, message: string, hideAfter?: number): void {
    store.dispatch(setAlertVisible(type, message));
    setTimeout((): void => {
        hideAlert();
    }, hideAfter || 5000);
}

export function hideAlert(): void {
    store.dispatch(setAlertInvisible());
}
