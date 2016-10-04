import {BaseModel} from '../models/BaseModel';
import {ModelService} from '../utils/modelService';
import {
    SAVE_INSTANCE,
    UPDATE_INSTANCE,
    DELETE_INSTANCE,
    CREATE_INSTANCE,
    SET_PAGE,
    TOGGLE_FILTERS,
    TOGGLE_NAV
} from '../constants';

export interface IInstanceAction {
    type: string;
    resource: string;
    instance: BaseModel;
}

function ModelActionFactory(type: string) {
    return (instance: BaseModel, resource: string): IInstanceAction => {
        return {
            type,
            resource,
            instance
        };
    };
}

export type ModelActionCreatorType = (instance: BaseModel, key?: string) => IInstanceAction

export const saveInstance: ModelActionCreatorType = ModelActionFactory(SAVE_INSTANCE);
export const updateInstance: ModelActionCreatorType = ModelActionFactory(UPDATE_INSTANCE);
export const deleteInstance: ModelActionCreatorType = ModelActionFactory(DELETE_INSTANCE);
export const createInstance: ModelActionCreatorType = ModelActionFactory(CREATE_INSTANCE);

export const setPage = (pageNumber: number, resource: string): {type: string, resource: string, pageNumber: number} => {
    return {
        type: SET_PAGE,
        resource: resource,
        pageNumber: pageNumber
    };
};

export const toggleFilters = (): {type: string} => {
    return {
        type: TOGGLE_FILTERS
    };
};

export const toggleNav = (): {type: string} => {
    return {
        type: TOGGLE_NAV
    };
};

export const saveAllInstances = (instanceList: any[], resource: string) => {
    return {
        type: 'SAVE_ALL_INSTANCES',
        resource,
        instanceList
    };
};

