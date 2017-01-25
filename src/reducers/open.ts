import {TOGGLE_NAV} from '../constants';

export function open (state: any = false, action: {type: string}) {
    switch (action.type) {
        case TOGGLE_NAV:
            return !state;
        default:
            return state;
    }
};
