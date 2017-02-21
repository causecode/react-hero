import {open} from '../reducers/open';
import {combineReducers} from 'redux';
import {Reducer} from 'redux';
import {routerReducer} from 'react-router-redux';
import {dataReducer as data} from '../reducers/data';
import {checkboxReducer} from '../reducers/checkboxReducers';
import {userReducer} from '../reducers/userReducer';
import {commonAlertReducer, commonModalReducer} from '../reducers/commonReducers';
const {combineForms} = require<any>('react-redux-form');
const reduxFormReducer = require<any>('redux-form').reducer;
let objectAssign: Function = require<Function>('object-assign');

export const addReducers = (ReducerConfig: Object): Reducer => {
    return combineReducers(objectAssign({}, ReducerConfig, {
        open,
        data,
        routing: routerReducer,
        form: reduxFormReducer,
        checkbox: checkboxReducer,
        alertDismissable: commonAlertReducer,
        confirmationModal: commonModalReducer,
        userAction: userReducer,
        forms: combineForms({rhForms: {}})
    }));
};
