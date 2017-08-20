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

export function scrollToTop(): void {
    setTimeout(() => {
        document.body.scrollTop = document.body.scrollTop - 70;
        if (document.body.scrollTop > 0) {
            scrollToTop();
        }
    }, 50);
}

export function getNestedData(parent: any, path: string): any {

    path.split('.').forEach((splittedKey: string) => {
        if (!parent) {
            return '';
        }
        const arrayRegExp = /(\w+\[\d+\])$/;
        if (arrayRegExp.test(splittedKey)) {
            const index = splittedKey.substring(splittedKey.lastIndexOf('[') + 1, splittedKey.lastIndexOf(']'));
            const key = splittedKey.substring(splittedKey.lastIndexOf('['), 0);
            parent = parent[key] && parent[key][index] ? parent[key][index] : '';
        } else {
            parent = parent.hasOwnProperty(splittedKey) ? parent[splittedKey] : '';
        }
    });

    return parent;
}
