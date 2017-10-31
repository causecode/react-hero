import {BaseModel} from '../models/BaseModel';
import {IGenericAction} from '../interfaces';
import {
    CLEAR_INSTANCE_DATA_ERROR,
    DELETE_INSTANCE,
    SAVE_ALL_INSTANCES,
    SAVE_INSTANCE,
    SET_PAGE,
    TOGGLE_FILTERS,
    TOGGLE_NAV,
    TOGGLE_SECONDARY_NAV,
    UNSET_RESOURCE_LIST,
    UPDATE_INSTANCE,
} from '../constants';

export interface IInstanceAction {
    type: string;
    resource: string;
    instance: BaseModel;
}

export function ModelActionFactory(type: string) {
    return (instance: BaseModel, resource: string): IInstanceAction => {
        return {
            type,
            resource,
            instance,
        };
    };
}

export type ModelActionCreatorType = (instance: BaseModel, key?: string) => IInstanceAction;

export const saveInstance: ModelActionCreatorType = ModelActionFactory(SAVE_INSTANCE);
export const updateInstance: ModelActionCreatorType = ModelActionFactory(UPDATE_INSTANCE);
export const deleteInstance: ModelActionCreatorType = ModelActionFactory(DELETE_INSTANCE);

export const setPage = (pageNumber: number, resource: string): {type: string, resource: string, pageNumber: number} => {
    return {
        type: SET_PAGE,
        resource: resource,
        pageNumber: pageNumber,
    };
};

export const unsetList = (resource: string) => {
    return {
        type: UNSET_RESOURCE_LIST,
        resource,
    };
};

export const toggleFilters = (): IGenericAction => {
    return {
        type: TOGGLE_FILTERS,
    };
};

export const toggleNav = (): IGenericAction => {
    return {
        type: TOGGLE_NAV,
    };
};

export const toggleSecondaryNav = (): IGenericAction => {
    return {
        type: TOGGLE_SECONDARY_NAV,
    };
};

export const saveAllInstances = (instanceList: BaseModel[], resource: string) => {
    return {
        type: SAVE_ALL_INSTANCES,
        resource,
        instanceList,
    };
};

export const clearInstanceDataError = (resource: string): IGenericAction => {
    return {
        type: CLEAR_INSTANCE_DATA_ERROR,
        payload: resource,
    };
};
