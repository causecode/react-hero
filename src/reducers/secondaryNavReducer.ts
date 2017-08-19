import {TOGGLE_SECONDARY_NAV} from '../constants';

export function secondaryNavReducer (state: boolean = false, action: {type: string}): boolean {
    switch (action.type) {
        case TOGGLE_SECONDARY_NAV:
            return !state;
        default:
            return state;
    }
}
