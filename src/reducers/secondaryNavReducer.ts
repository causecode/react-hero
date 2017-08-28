import {TOGGLE_SECONDARY_NAV} from '../constants';
import {IGenericAction} from '../interfaces';

export function secondaryNavReducer (state: boolean = false, action: IGenericAction) {
    switch (action.type) {
        case TOGGLE_SECONDARY_NAV:
            return !state;
        default:
            return state;
    }
}
