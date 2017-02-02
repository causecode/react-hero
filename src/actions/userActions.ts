import {IGenericAction, IUserAction} from '../interfaces';

export function resetUserAction (): IGenericAction {
    return {
        type: 'RESET_USER_ACTION'
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
