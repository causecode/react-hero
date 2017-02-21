import {store} from '../store';
import {hideConfirmationModal, setAlertVisible, setAlertInvisible} from '../actions/commonActions';

export function hideModal(): void {
    store.dispatch(hideConfirmationModal());
};

export function showAlert(type: string, message: string): void {
    store.dispatch(setAlertVisible(type, message));
    setTimeout(function() {
        hideAlert();
    }, 5000);
}

export function hideAlert(): void {
    store.dispatch(setAlertInvisible());
}
