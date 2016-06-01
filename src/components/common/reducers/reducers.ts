import {TOGGLE_NAV} from "../actions/actions";

export const toggle = (state, action) => {
	if (action.type == TOGGLE_NAV) {
		return {open: !state.open};
	}
	return state;
};
