import {Store, compose, createStore, applyMiddleware} from 'redux';
import {IStore} from '~react-router-redux~redux/redux';
import rootReducer from './../reducers/rootReducer';
import promiseMiddleware from '../middleware/promise-middleware';
import logger from './logger';
const thunk = require<any>('redux-thunk').default;

const initialState = {
    open: false
};

export const store: any = createStore (
    rootReducer,
    initialState,
    compose(
        _getMiddleware(),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

function _getMiddleware() {
    let middleware = [
        promiseMiddleware,
        thunk,
    ];

    // TODO add logs only for dev env
    middleware = [...middleware, logger];

    return applyMiddleware(...middleware);
}