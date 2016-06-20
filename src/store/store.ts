import {Store, compose, createStore, applyMiddleware} from 'redux';
import { fromJS } from 'immutable';
import {IStore} from '~react-router-redux~redux/redux';
import rootReducer from './../reducers/rootReducer';
import promiseMiddleware from '../middleware/promise-middleware';
import logger from './logger';
const persistState = require<any>('redux-localstorage');
const thunk = require<any>('redux-thunk').default;

function configureStore(initialState) {
    const store = compose(
        _getMiddleware(),
        ..._getEnhancers()
    )(createStore)(rootReducer, initialState);

    return store;
}

function _getMiddleware() {
    let middleware = [
        promiseMiddleware,
        thunk,
    ];

    // TODO add logs only for dev env
    middleware = [...middleware, logger];

    return applyMiddleware(...middleware);
}

function _getEnhancers() {
    let enhancers = [
        persistState('session', _getStorageConfig()),
    ];

    return enhancers;
}

function _getStorageConfig() {
    return {
        key: 'react-redux-seed',
        serialize: (store) => {
            return store && store.session ?
                //JSON.stringify(store.session.toJS()) : store;
                store.session.toJS() : store;
        },
        deserialize: (state) => ({
            session: state ? fromJS(JSON.parse(state)) : fromJS({}),
        }),
    };
}

export const store = configureStore({});
export default configureStore;