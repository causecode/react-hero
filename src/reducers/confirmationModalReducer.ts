let MODAL_INITIAL_STATE: boolean = false;

export function confirmationModalReducer(state: boolean = MODAL_INITIAL_STATE, action: {type: string}): boolean {
    switch (action.type) {
        case 'SHOW_CONFIRMATION_MODAL':
            return true;

        case 'HIDE_CONFIRMATION_MODAL':
            return false;

        default:
            return state;
    }
};
