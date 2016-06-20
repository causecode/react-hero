export const INCREMENT_COUNTER = 'App/INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'App/DECREMENT_COUNTER';

export const LOGIN_USER_PENDING = 'App/LOGIN_USER_PENDING';
export const LOGIN_USER_SUCCESS = 'App/LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'App/LOGIN_USER_ERROR';

export const LOGOUT_USER = 'App/LOGOUT_USER';
export const FORM_RESET = 'redux-form/RESET';

export const FETCH_INSTANCE_LIST_START = 'App/FETCH_INSTANCE_LIST_START';
export const FETCH_INSTANCE_LIST_SUCCESS = 'App/FETCH_INSTANCE_LIST_SUCCESS';
export const FETCH_INSTANCE_LIST_ERROR = 'App/FETCH_INSTANCE_LIST_ERROR';
export const DELETE_INSTANCE_LIST = 'App/DELETE_INSTANCE_LIST';

export function makeActionCreator(type, ...argNames) {
    return function(...args) {
        let action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        });
        return action;
    }
}
