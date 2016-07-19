import { Store, compose, createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import rootReducer from './../reducers/rootReducer';
import promiseMiddleware from '../middleware/promise-middleware';
import logger from './logger';
const thunk = require<any>('redux-thunk').default;
const MockStore = require<any>('redux-mock-store');

// declaring this module here the node typings have an error.
declare module process {
    export module env {
        let NODE_ENV: string;
    }
}

// MockStore interface copied from redux-mock-store index.d.ts file since interface is not exported.
export interface IMockStore extends Store {
    getState(): any;
    getActions(): Array<any>;
    dispatch(action: any): any;
    clearActions(): void;
    subscribe(): any;
}

function configureStore(initialState): Store | IMockStore {
    let store: Store | IMockStore;
    if (process.env.NODE_ENV === 'test') {
         store = (MockStore as Function)()(_getMiddleware());
    } else {
        store = compose(
            _getMiddleware(),
            ..._getEnhancers()
        )(createStore)(rootReducer, initialState);
    }

    return store;
}

function _getMiddleware() {
    let middleware = [
        promiseMiddleware,
        thunk,
    ];

    if (process.env.NODE_ENV === 'development') {
        middleware.push(logger);
    }

    return applyMiddleware(...middleware);
}

function _getEnhancers() {
    let enhancers = [];

    if (window.devToolsExtension) {
        enhancers = [window.devToolsExtension()];
    }

    return enhancers;
}

export const store: Store | IMockStore = configureStore({});
export default configureStore;
