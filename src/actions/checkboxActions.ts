import {IUserAction, IGenericAction} from '../interfaces';

export function toggleCheckbox (type: string, id: number): IUserAction {
    return {
        type,
        payload: id,
    };
}

export function selectAllRecords (type: string, checked: boolean): IUserAction {
    return {
        type,
        payload: checked,
    };
}

export function resetCheckboxState (): IGenericAction {
    return {
        type: 'RESET_CHECKBOXES',
    };
}
