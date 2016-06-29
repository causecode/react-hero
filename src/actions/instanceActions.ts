import BaseModel from "../models/BaseModel";
export const SAVE_INSTANCE = 'SAVE_INSTANCE';
export const UPDATE_INSTANCE = 'UPDATE_INSTANCE';
export const DELETE_INSTANCE = 'DELETE_INSTANCE';

export interface IInstanceAction {
    type: string,
    instance: BaseModel
}

export const saveInstance = ( instance: BaseModel ): IInstanceAction => {
    return {
        type: SAVE_INSTANCE,
        instance,
    }
}

export const updateInstance = ( instance: BaseModel ): IInstanceAction => {
    return {
        type: UPDATE_INSTANCE,
        instance,
    }
}

export const deleteInstance = ( instance: BaseModel ): IInstanceAction => {
    return {
        type: DELETE_INSTANCE,
        instance,
    }
}

