import {combineReducers} from 'redux';
import {open} from './open';
import {dataReducer as data} from './data';
import {routerReducer} from 'react-router-redux';
import {userReducer} from './userReducer';
import {checkboxReducer} from './checkboxReducers';
import {Reducer} from 'redux';
import {alertReducer} from './alertDismissableReducer';
import {confirmationModalReducer} from './confirmationModalReducer';
const {combineForms} = require<any>('react-redux-form');
const reduxFormReducer = require<any>('redux-form').reducer;

let rootReducer: Reducer = combineReducers({
    open,
    data,
    checkbox: checkboxReducer,
    alertDismissable: alertReducer,
    confirmationModal: confirmationModalReducer,
    userAction: userReducer,
    routing: routerReducer,
    form: reduxFormReducer,
    forms: combineForms({rhForms: {}}),
});

export {rootReducer};
