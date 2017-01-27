import {store} from '../store/index';
import {resetUserAction} from '../actions/userActions';

export function clearUserAction () {
    store.dispatch(resetUserAction());
}
