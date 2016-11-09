export const SAVE_INSTANCE: string = 'SAVE_INSTANCE';
export const UPDATE_INSTANCE: string = 'UPDATE_INSTANCE';
export const DELETE_INSTANCE: string = 'DELETE_INSTANCE';
export const FETCH_INSTANCE_DATA: string = 'FETCH_INSTANCE_DATA';
export const FETCH_INSTANCE_LIST: string = 'FETCH_INSTANCE_LIST';
export const FETCH_INSTANCE_DATA_START: string = 'FETCH_INSTANCE_DATA_START';
export const FETCH_INSTANCE_DATA_FULFILLED: string = 'FETCH_INSTANCE_DATA_FULFILLED';
export const FETCH_INSTANCE_DATA_ERROR: string = 'FETCH_INSTANCE_DATA_ERROR';
export const FETCH_INSTANCE_LIST_START: string = 'FETCH_INSTANCE_LIST_START';
export const FETCH_INSTANCE_LIST_FULFILLED: string = 'FETCH_INSTANCE_LIST_FULFILLED';
export const FETCH_INSTANCE_LIST_ERROR: string = 'FETCH_INSTANCE_LIST_ERROR';
export const SET_PAGE: string = 'SET_PAGE';
export const UNSET_RESOURCE_LIST: string = 'UNSET_RESOURCE_LIST';
export const TOGGLE_FILTERS: string = 'TOGGLE_FILTERS';
export const CREATE_INSTANCE: string = 'CREATE_INSTANCE';
export const TOGGLE_NAV: string = 'TOGGLE_NAV';

// Error messages.
export const NO_PROP_TYPES = (modelName: string): string => `Cannot instantiate ${modelName}, No prop types defined.`;
export const PAGE_NOT_FOUND: string = 'Page not found.';
export const INSTANTIATION_ERROR: string = 'Instantiation Failed: Trying to create a new instance of DeviceTypes. '
        + 'Please use one of the predefined Device types.';
export const INVALID_STATE: string = 'Invalid State.';
export const RESOURCE_DATA_UNINTIALIZED: (resource: string) => string = (resource) => {
    return `Resource Data not initialized for resource ${resource}`;
};
export const INVALID_INSTANCE: string = 'Invalid Instance passed to setInstance';
export const MODEL_RESOURCE_ERROR: string = 'Model cannot be initialized without resourceName';
export const MISSING_ID_IN_METHOD = (methodName: string) => { 
    return `Cannot perform ${methodName} when the instance does not have an id.`; 
};
