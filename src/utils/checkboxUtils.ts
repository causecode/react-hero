import {store} from '../store/index';
import {resetCheckboxState} from '../actions/userActions';

export function resetSelectedRecords() {
    store.dispatch(resetCheckboxState());
};
