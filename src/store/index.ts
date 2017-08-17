import {Store, compose, createStore, applyMiddleware} from 'redux';
import {rootReducer} from './../reducers/rootReducer';
import {promiseMiddleware} from '../middleware/promiseMiddleware';
import logger from './logger';
const thunk = require<any>('redux-thunk').default;
const configureMockStore: Function = require<{default: any}>('redux-mock-store').default;

// Doing this to avoid cyclic imports problem when used through commandline.

// MockStore interface copied from redux-mock-store index.d.ts file since interface is not exported.
export interface IMockStore extends Store<{}> {
    getState(): any;
    getActions(): Array<any>;
    clearActions(): void;
    subscribe(): any;
}

export function configureStore(initialState): Store<{}> | IMockStore {
    let store: Store<{}> | IMockStore;
    // Using process.env.NODE_ENV instead of appService.getEnvironment because appService Import was returning empty.
    if (process.env.NODE_ENV === 'test') {
        store = configureMockStore()(initialState);
        // store = configureMockStore(_getMiddleware())(initialState, rootReducer, _getMiddleware());
    } else {
        store = compose.apply(null, [_getMiddleware(), ..._getEnhancers()])(createStore)(rootReducer, initialState);
    }

    return store;
}

/**
 * Using any here because, type GenericStoreEnhancer is not available in
 * typings v3.1.1. And, typings cannot be upgraded due to changed definition of compose(...)
 * in latest typings.
 * TODO : Figure out a way to add GenericStoreEnhancer as return type for _getMiddelware()
 */
function _getMiddleware(): any {
    let middleware = [
        promiseMiddleware,
        thunk,
    ];

    if (process.env.NODE_ENV === 'development') {
        middleware.push(logger);
    }

    return applyMiddleware(...middleware);
}

export function _getEnhancers(): any {
    let enhancers: any = [];

    if (typeof(window) !== 'undefined' && window.devToolsExtension) {
        enhancers = [window.devToolsExtension()];
    }

    return enhancers;
}

export const store: Store<{}> | IMockStore = configureStore({});
