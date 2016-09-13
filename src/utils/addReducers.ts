import {open} from '../reducers/open';
import {combineReducers} from 'redux';
import {Reducer} from 'redux';
const formReducer = require<any>('redux-form').reducer;
import {routerReducer} from 'react-router-redux';
import {modelReducer as instances} from '../reducers/modelReducer';
import {dataReducer as data} from '../reducers/data';
let objectAssign: Function = require<Function>('object-assign');

export const addReducers = (ReducerConfig: Object): Reducer => {
    return combineReducers(objectAssign({}, ReducerConfig, {
        open,
        data,
        instances,
        routing: routerReducer,
        form: formReducer
    }));
};
