import {BaseModel} from '../models/BaseModel';
import {
    SAVE_INSTANCE,
    UPDATE_INSTANCE,
    DELETE_INSTANCE,
    SET_PAGE,
    TOGGLE_FILTERS,
    TOGGLE_NAV,
    UNSET_RESOURCE_LIST,
    SAVE_ALL_INSTANCES,
    TOGGLE_SECONDARY_NAV,
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

export type ModelActionCreatorType = (instance: BaseModel, key?: string) => IInstanceAction

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

export const toggleFilters = (): {type: string} => {
    return {
        type: TOGGLE_FILTERS,
    };
};

export const toggleNav = (): {type: string} => {
    return {
        type: TOGGLE_NAV,
    };
};

export const toggleSecondaryNav = (): {type: string} => {
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

