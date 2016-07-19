import open from '../reducers/open';
import {combineReducers} from 'redux';
import {Reducer} from 'redux';
const formReducer = require<any>('redux-form').reducer;
import {routerReducer} from 'react-router-redux';
import instances from '../reducers/instanceReducer';
import data from '../reducers/data';

export const addReducers = (userReducer: Reducer): Reducer => {
    return combineReducers({
        userReducer,
        open,
        data,
        instances,
        routing: routerReducer,
        form: formReducer
    });
};
