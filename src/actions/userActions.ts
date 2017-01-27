import {IGenericAction, IUserAction} from '../interfaces/index';
export function setCheckboxChecked (id: number): IUserAction {
    return {
        type: 'CHECK_CHECKBOX',
        payload: id
    };
}

export function setCheckboxUnchecked (id: number): IUserAction {
    return {
        type: 'UNCHECK_CHECKBOX',
        payload: id
    };
}

export function selectAllRecordsOnPage (checked: boolean): IUserAction {
    return {
        type: 'SELECT_ALL_RECORDS_ON_PAGE',
        payload: checked
    };
}

export function selectAllRecords (checked: boolean): IUserAction {
    return {
        type: 'SELECT_ALL_RECORDS',
        payload: checked
    };
}

export function resetUserAction (): IGenericAction {
    return {
        type: 'RESET_USER_ACTION'
    };
}

export function resetCheckboxState (): IGenericAction {
    return {
        type: 'RESET_CHECKBOXES'
    };
}

export function saveUserAction (action: string): IUserAction {
    return {
        type: 'SAVE_USER_ACTION',
        payload: action
    };
};

export function saveUserActionData (records: number): IUserAction {
    return {
        type: 'SAVE_USER_ACTION_DATA',
        payload: records
    };
}
