import {TOGGLE_NAV} from '../constants';

export function primaryNavReducer (state: any = false, action: {type: string}) {
    switch (action.type) {
        case TOGGLE_NAV:
            return !state;
        default:
            return state;
    }
}
