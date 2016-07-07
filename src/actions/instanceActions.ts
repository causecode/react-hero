import BaseModel from '../models/BaseModel';
import {fetchInstanceDataFromApi} from '../api/auth/index';

export const SAVE_INSTANCE: string = 'SAVE_INSTANCE';
export const UPDATE_INSTANCE: string = 'UPDATE_INSTANCE';
export const DELETE_INSTANCE: string = 'DELETE_INSTANCE';
export const FETCH_INSTANCE_DATA_START: string = 'App/FETCH_INSTANCE_DATA_START';
export const FETCH_INSTANCE_DATA_SUCCESS: string = 'App/FETCH_INSTANCE_DATA_SUCCESS';
export const FETCH_INSTANCE_DATA_ERROR: string = 'App/FETCH_INSTANCE_DATA_ERROR';

export interface IInstanceAction {
    type: string;
    instance: BaseModel;
}

export const saveInstance = ( instance: BaseModel ): IInstanceAction => {
    return {
        type: SAVE_INSTANCE,
        instance,
    };
};

export const updateInstance = ( instance: BaseModel ): IInstanceAction => {
    return {
        type: UPDATE_INSTANCE,
        instance,
    };
};

export const deleteInstance = ( instance: BaseModel ): IInstanceAction => {
    return {
        type: DELETE_INSTANCE,
        instance,
    };
};

export function fetchInstanceData(resource: string, resourceID: string) {
    let path: string = `${resource}/show/${resourceID}`;
    return (dispatch) => {
        return dispatch({
            types: [
                FETCH_INSTANCE_DATA_START,
                FETCH_INSTANCE_DATA_SUCCESS,
                FETCH_INSTANCE_DATA_ERROR,
            ],
            payload: {
                promise: fetchInstanceDataFromApi(path)
                    .then((response) => {
                        return response;
                    }),
            },
            resource: resource
        });
    };
};
