import {combineReducers} from 'redux';
import {open} from './open';
import {dataReducer as data} from './data';
const reduxFormReducer = require<any>('redux-form').reducer;
import {routerReducer} from 'react-router-redux';
import {Reducer} from 'redux';

let rootReducer: Reducer = combineReducers({
    open,
    data,
    routing: routerReducer,
    form: reduxFormReducer,
});

export {rootReducer};
