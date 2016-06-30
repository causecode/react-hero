import {combineReducers} from 'redux';
import open from './open';
import data from './data';
const formReducer = require<any>('redux-form').reducer;
import instances from './instanceReducer';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
    open,
    data,
    instances,
    routing: routerReducer,
    form: formReducer
});
