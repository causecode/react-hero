import {combineReducers} from 'redux';
import open from './open';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
    open,
    routing: routerReducer
});
