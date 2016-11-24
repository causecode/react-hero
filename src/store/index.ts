import {Store, compose, createStore, applyMiddleware} from 'redux';
import {rootReducer} from './../reducers/rootReducer';
import {promiseMiddleware} from '../middleware/promiseMiddleware';
import logger from './logger';
import * as appService from '../utils/appService';
const thunk = require<any>('redux-thunk').default;
const MockStore = require<{default: any}>('redux-mock-store').default;

// Doing this to avoid cyclic imports problem when used through commandline.
let getEnvironment = appService.getEnvironment || (() => '');

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
    if ( getEnvironment() === 'test') {
         store = (MockStore as Function)()(initialState, rootReducer, _getMiddleware());
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

    if (getEnvironment() === 'development') {
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
