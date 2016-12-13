import {Store, compose, createStore, applyMiddleware} from 'redux';
import {rootReducer} from './../reducers/rootReducer';
import {promiseMiddleware} from '../middleware/promiseMiddleware';
import logger from './logger';
import {getEnvironment} from '../utils/appService';
const thunk = require<any>('redux-thunk').default;
const configureMockStore: Function = require<{default: any}>('redux-mock-store').default;

// Doing this to avoid cyclic imports problem when used through commandline.

// MockStore interface copied from redux-mock-store index.d.ts file since interface is not exported.
export interface IMockStore extends Store {
    getState(): any;
    getActions(): Array<any>;
    dispatch(action: any): any;
    clearActions(): void;
    subscribe(): any;
}

export function configureStore(initialState): Store | IMockStore {
    let store: Store | IMockStore;
    // Using process.env.NODE_ENV instead of appService.getEnvironment because appService Import was returning empty.
    if (process.env.NODE_ENV === 'test') {
        store = configureMockStore()(initialState)
        // store = configureMockStore(_getMiddleware())(initialState, rootReducer, _getMiddleware());
    } else {
        store = compose(
            _getMiddleware(),
            ..._getEnhancers()
        )(createStore)(rootReducer, initialState);
    }

    return store;
}

function _getMiddleware(): Function {
    let middleware = [
        promiseMiddleware,
        thunk,
    ];

    if (process.env.NODE_ENV === 'development') {
        middleware.push(logger);
    }

    return applyMiddleware(...middleware);
}

export function _getEnhancers() {
    let enhancers = [];

    if (typeof(window) !== 'undefined' && window.devToolsExtension) {
        enhancers = [window.devToolsExtension()];
    }

    return enhancers;
}

export const store: Store | IMockStore = configureStore({});