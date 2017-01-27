import {combineReducers} from 'redux';
import {open} from './open';
import {dataReducer as data} from './data';
import {routerReducer} from 'react-router-redux';
import {userActionReducer} from './userActionReducer';
import {checkboxReducer} from './checkboxReducers';
import {Reducer} from 'redux';
const {combineForms} = require<any>('react-redux-form');
const reduxFormReducer = require<any>('redux-form').reducer;

let rootReducer: Reducer = combineReducers({
    open,
    data,
    checkbox: checkboxReducer,
    userAction: userActionReducer,
    routing: routerReducer,
    form: reduxFormReducer,
    forms: combineForms({rhForms: {}})
});

export {rootReducer};
