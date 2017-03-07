import {BaseModel} from '../models/BaseModel';
import {isEmpty} from './appService';
import {fromJS} from 'immutable';
import {INVALID_INSTANCE} from '../constants';
import {INVALID_STATE} from '../constants';

export function deleteInstanceInList<T extends BaseModel>(state: any, resource: string, instance: T) {
    let instanceList: any = getInstanceList(state, resource);
    let {index} = findInstanceInList(instanceList, instance.properties.id);

    if (index >= 0) {
        instanceList.splice(index, 1);
    }

    return setInstanceList(state, resource, instanceList);
}

export function getInstanceList(state: any, resource: string) {
    let resourceData: any = getResourceData(state, resource).toJS();
    return !isEmpty(resourceData) && !isEmpty(resourceData.instanceList) ? resourceData.instanceList : [];
}

export function getResourceData(state: any, resource: string) {
    validateState(state);
    return state.get(`${resource}List`) || fromJS({});
}

export function setInstanceInList<T extends BaseModel>
(state: any, resource: string, instance: T, force: boolean = false) {
    if (!instance.properties.id) {
        throw new Error(INVALID_INSTANCE);
    }

    let instanceList: any = getInstanceList(state, resource);

    let {index}: {index: number} = findInstanceInList<T>(instanceList, instance.properties.id.toString());
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

    let updatedState: any = deleteInstanceInList(state, resource, instance); // Deleting instance from instanceList.

    let editInstance: any = getEditInstance(updatedState, resource);
    if (!isEmpty(editInstance) && editInstance.properties.id === instance.properties.id) {
        updatedState = state.delete(`${resource}Edit`);
    }

    let createInstance = getCreateInstance(updatedState, resource);
    if (!isEmpty(createInstance) && createInstance.properties.id === instance.properties.id) {
        updatedState = state.delete(`${resource}Create`);
    }

    return updatedState;
}

export function setAllInstances<T extends BaseModel>
        (state: any, resource: string, instance: T, force: boolean = false) {
    validateState(state);
    let updatedState = setInstanceInList(state, resource, instance, force); // Update the instance from <resource>List.

    let editInstance: any = getEditInstance(updatedState, resource);
    if (!isEmpty(editInstance) && editInstance.properties.id === instance.properties.id) {
        // Update Edit Instance if the current and Edit instances are the same.
        updatedState = setEditInstance(state, resource, instance);
    }

    let createInstance = getCreateInstance(updatedState, resource);
    if (!isEmpty(createInstance) && createInstance.properties.id === instance.properties.id) {
        updatedState = setCreateInstance(state, resource, instance);
    }

    return updatedState;
}


export function findInstanceByID<T>(state: any, resource: string, id: string): {instance: T, index: number} {
    /*
     * Since the instances will always be inside the data key inside the store. This if block will add
     * compatibility for us inside and outside of a reducer.
     */
    if (state.data) {
        state = state.data.toJS ? state.data.toJS() : state.data;
    }
    let resourceList = state[`${resource}List`];
    let instanceList: T[] =  resourceList && resourceList.instanceList ? resourceList.instanceList : [];

    return findInstanceInList(instanceList, id);
}

export function findInstanceInList<T>(instanceList: T[], id: string) {
    let requiredInstance: T;
    let index: number = -1;
    instanceList.every((instance, i) => {
        // Access properties via string literal because type T does not have a property named properties.
        let properties = instance[`properties`];
        if (!properties || !properties.id) {
            return true; // continue to next instance.
        }
        if (properties.id.toString() === id) {
            requiredInstance = instance;
            index = i;
            return false; // stop looping.
        }
        return true;
    });

    return {instance: requiredInstance, index};
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
