import {TOGGLE_NAV} from '../actions/actions';

export function open (state: any = false, action: any) {
    switch (action.type) {
        case TOGGLE_NAV:
            return !state;
        default:
            return state;
    }
};
