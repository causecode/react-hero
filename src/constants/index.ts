export const FETCH_INSTANCE_LIST_START = 'App/FETCH_INSTANCE_LIST_START';
export const FETCH_INSTANCE_LIST_SUCCESS = 'App/FETCH_INSTANCE_LIST_SUCCESS';
export const FETCH_INSTANCE_LIST_ERROR = 'App/FETCH_INSTANCE_LIST_ERROR';
export const DELETE_INSTANCE_LIST = 'App/DELETE_INSTANCE_LIST';
export const FETCH_INSTANCE_DATA_START = 'App/FETCH_INSTANCE_DATA_START';
export const FETCH_INSTANCE_DATA_SUCCESS = 'App/FETCH_INSTANCE_DATA_SUCCESS';
export const FETCH_INSTANCE_DATA_ERROR = 'App/FETCH_INSTANCE_DATA_ERROR';

export function makeActionCreator(type, ...argNames) {
    return function(...args) {
        let action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    };
}
