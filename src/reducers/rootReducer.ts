import {combineReducers} from 'redux';
import open from './open';
import data from './data';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
    open, data,
    routing: routerReducer
});
