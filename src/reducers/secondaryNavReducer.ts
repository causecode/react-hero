import {TOGGLE_SECONDARY_NAV} from '../constants';

export function secondaryNavReducer (state: any = false, action: {type: string}) {
    switch (action.type) {
        case TOGGLE_SECONDARY_NAV:
            return !state;
        default:
            return state;
    }
}
