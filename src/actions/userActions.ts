export function setCheckboxChecked (id: number) {
    return {
        type: 'SAVE_CHECKBOX_ID',
        payload: id
    };
}

export function setCheckboxUnchecked (id: number) {
    return {
        type: 'CLEAR_CHECKBOX_ID',
        payload: id
    };
}

export function selectAllRecordsOnPage (id: number, checked: boolean) {
    return {
        type: 'SELECT_ALL_RECORDS_ON_PAGE',
        payload: {
            id: id,
            checked: checked
        }
    };
}

export function selectAllRecords (id: number, checked: boolean) {
    return {
        type: 'SELECT_ALL_RECORDS',
        payload: {
            id: id,
            checked: checked
        }
    };
}

export function resetUserAction () {
    return {
        type: 'RESET_USER_ACTION'
    };
}

export function resetCheckboxState () {
    return {
        type: 'RESET_CHECKBOX_STATE'
    };
}

export function saveUserAction (action: string) {
    return {
        type: 'SAVE_USER_ACTION',
        payload: action
    };
};

export function saveUserActionData (records: number) {
    return {
        type: 'SAVE_USER_ACTION_DATA',
        payload: records
    };
}
