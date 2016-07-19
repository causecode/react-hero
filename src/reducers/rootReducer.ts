import {combineReducers} from 'redux';
import {open} from './open';
import {dataReducer as data} from './data';
const formReducer = require<any>('redux-form').reducer;
import {instanceReducer as instances} from './instanceReducer';
import {routerReducer} from 'react-router-redux';

let rootReducer = combineReducers({
    open,
    data,
    instances,
    routing: routerReducer,
    form: formReducer
});

export {rootReducer}
