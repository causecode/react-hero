import {combineReducers} from 'redux';
import open from './open';
import data from './data';
const formReducer = require<any>('redux-form').reducer;
import crud from './crudReducer';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
    open,
    data,
    crud,
    routing: routerReducer,
    form: formReducer
});
