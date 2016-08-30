import { Store, compose, createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import {rootReducer} from './../reducers/rootReducer';
import {promiseMiddleware} from '../middleware/promiseMiddleware';
import logger from './logger';
import {getEnvironment} from '../utils/appService';
const thunk = require<any>('redux-thunk').default;
const MockStore = require<any>('redux-mock-store');

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

    if (window.devToolsExtension) {
        enhancers = [window.devToolsExtension()];
    }

    return enhancers;
}

export const store: Store | IMockStore = configureStore({});
export default configureStore;
