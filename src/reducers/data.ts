import {fromJS} from 'immutable';
import {resolver} from '../resolver';
import {BaseModel} from '../models/BaseModel';
import {ModelService} from '../utils/modelService';
import {
    FETCH_INSTANCE_LIST_START,
    FETCH_INSTANCE_LIST_FULFILLED,
    FETCH_INSTANCE_LIST_ERROR,
    TOGGLE_FILTERS,
    SET_PAGE
} from '../constants';
import {MissingActionPayloadError} from '../errors/MissingActionPayloadError';
import {FETCH_INSTANCE_DATA_START} from '../constants';
import {FETCH_INSTANCE_DATA_FULFILLED} from '../constants';
import {FETCH_INSTANCE_DATA_ERROR} from '../constants';
import {INVALID_STATE} from '../constants';
import {RESOURCE_DATA_UNINTIALIZED} from '../constants';
import {INVALID_INSTANCE} from '../constants';
import {SAVE_INSTANCE} from '../constants';
import {UPDATE_INSTANCE} from '../constants';
import {DELETE_INSTANCE} from '../constants';
import {CREATE_INSTANCE} from '../constants';
import {isEmpty} from '../utils/appService';
import * as StoreService from '../utils/storeService';

const INITIAL_STATE = fromJS({
    filtersOpen: false,
});

function dataReducer(state = INITIAL_STATE, action ) {
    let Model: typeof BaseModel;
    switch (action.type) {

        case FETCH_INSTANCE_DATA_START:
            return state;

        case FETCH_INSTANCE_DATA_FULFILLED:
            let instanceResource = action.resource || '';
            Model = ModelService.getModel(instanceResource);
            let instance = {};
            if (action.payload) {
                let payloadData = action.payload;
                for (let key in payloadData) {
                    if (payloadData.hasOwnProperty(key)) {
                        if (payloadData[key].constructor === Array) {
                            instance[key] = payloadData[key];
                        } else {
                            (<any>Object).assign(instance, payloadData[key]);
                        }
                    }
                }
            } else {
                throw new MissingActionPayloadError();
            }

            let modelInstance = new Model(instance);

            if (action.isEditPageInstance) {
                return state.set(`${instanceResource}Edit`, modelInstance);
            } else {
                return StoreService.setInstanceInList(state, instanceResource, modelInstance, true);
            }

        case FETCH_INSTANCE_DATA_ERROR:
            return state.set(`${action.resource}Edit`, fromJS({
                hasError: true,
                isLoading: false,
            }));

        case FETCH_INSTANCE_LIST_START:
            return state;

        case FETCH_INSTANCE_LIST_FULFILLED:
            let listResource = action.resource || '';
            Model = ModelService.getModel(listResource);
            let instanceList, totalCount: number, properties: string[];
            if (action.payload && action.payload.instanceList) {
                totalCount = action.payload.totalCount;
                properties = action.payload.properties;
                instanceList = action.payload.instanceList.map(instance => {
                    return new Model(instance);
                });
            } else {
                throw new MissingActionPayloadError();
            }
            let listProps = {};
            listProps = fromJS({
                totalCount: totalCount,
                instanceList: instanceList,
                properties: properties,
                hasError: false,
                isLoading: false,
            });
            return state.mergeIn([`${listResource}List`], listProps);

        case FETCH_INSTANCE_LIST_ERROR:
            return state.set(`${action.resource}List`, fromJS({
                hasError: true,
                isLoading: false,
            }));

        case 'SAVE_ALL_INSTANCES':
            let existingInstanceList = state.getIn([`${action.resource}List`, 'instanceList'], []);
            let incomingInstanceList = action.instanceList || [];
            return state.setIn(
                    [`${action.resource}List`, 'instanceList'],
                    existingInstanceList.concat(incomingInstanceList)
            );

        case SET_PAGE:
            return state.setIn([`${action.resource}List`, 'activePage'], action.pageNumber);

        case TOGGLE_FILTERS:
            return  state.update('filtersOpen', (value) => value = !value);

        case SAVE_INSTANCE:
            return StoreService.setAllInstances(state, action.resource, action.instance, true);

        case UPDATE_INSTANCE:
            return StoreService.setAllInstances(state, action.resource, action.instance);

        case DELETE_INSTANCE:
            return StoreService.deleteAllInstances(state, action.resource, action.instance);

        case CREATE_INSTANCE:
            return state.set(`${action.instance.resourceName}Create`, action.instance);

        default:
            return state;
        }
}

export function deleteInstanceInList<T extends BaseModel>(state: any, resource: string, instance: T) {
    let instanceList = getInstanceList(state, resource);
    let {index} = ModelService.findInstanceInList(instanceList, instance.properties.id);

    if (index >= 0) {
        instanceList.splice(index, 1);
    }

    return setInstanceList(state, resource, instanceList);
}

export function getInstanceList(state: any, resource: string) {
    let resourceData = getResourceData(state, resource);
    return !isEmpty(resourceData) && !isEmpty(resourceData.instanceList) ? resourceData.instanceList : [];
}

export function getResourceData(state: any, resource: string) {
    validateState(state);
    return state.toJS()[`${resource}List`] || {};
}

export function setInstanceInList<T extends BaseModel>
        (state: any, resource: string, instance: T, force: boolean = false) {
    if (!instance.properties.id) {
        throw new Error(INVALID_INSTANCE);
    }

    let instanceList = getInstanceList(state, resource);

    let {index}: {index: number} = ModelService
            .findInstanceInList<T>(instanceList, instance.properties.id);
    if (index < 0 && force) {
        instanceList.push(instance);
    } else if (index >= 0) {
        instanceList[index] = instance;
    }

    return setInstanceList(state, resource, instanceList);
}

export function validateState(state: any) {
    if (isEmpty(state)) {
        throw new Error(INVALID_STATE);
    }

    state = state.toJS ? state.toJS() : state;
    if (isEmpty(state)) {
        throw new Error(INVALID_STATE);
    }
}

export function deleteAllInstances<T extends BaseModel>(state: any, resource: string, instance: T) {
    validateState(state);

    state = deleteInstanceInList(state, resource, instance); // Deleting instance from instanceList.

    let editInstance = getEditInstance(state, resource);
    if (!isEmpty(editInstance) && editInstance.properties.id === instance.properties.id) {
        state = state.delete(`${resource}Edit`);
    }

    let createInstance = getCreateInstance(state, resource);
    if (!isEmpty(createInstance) && createInstance.properties.id === instance.properties.id) {
        state = state.delete(`${resource}Create`);
    }

    return state;
}

export function setAllInstances<T extends BaseModel>
        (state: any, resource: string, instance: T, force: boolean = false) {
    validateState(state);
    state = setInstanceInList(state, resource, instance, force); // Update the instance from <resource>List.

    let editInstance = getEditInstance(state, resource);
    if (!isEmpty(editInstance) && editInstance.properties.id === instance.properties.id) {
        // Update Edit Instance if the current and Edit instances are the same.
        state = setEditInstance(state, resource, instance);
    }

    let createInstance = getCreateInstance(state, resource);
    if (!isEmpty(createInstance) && createInstance.properties.id === instance.properties.id) {
        state = setCreateInstance(state, resource, instance);
    }

    return state;
}

export function setInstanceList<T extends BaseModel>(state: any, resource: string, instanceList: T[]) {
    validateState(state);
    return state.setIn([`${resource}List`, 'instanceList'], instanceList);
}

export function setEditInstance<T extends BaseModel>(state: any, resource: string, instance: T) {
    validateState(state);
    return state.set(`${resource}Edit`, instance);
}

export function getEditInstance<T extends BaseModel>(state: any, resource: string) {
    validateState(state);
    return state.get(`${resource}Edit`);
}

export function setCreateInstance<T extends BaseModel>(state: any, resource: string, instance: T) {
    validateState(state);
    return state.setIn([`${resource}List`, `${resource}Edit`], instance);
}

export function getCreateInstance(state: any, resource: string) {
    validateState(state);
    return state.get(`${resource}Create`);
}

export {dataReducer};
