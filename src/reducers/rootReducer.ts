import {combineReducers} from 'redux';
import {primaryNavReducer} from './primaryNavReducer';
import {secondaryNavReducer} from './secondaryNavReducer';
import {dataReducer as data} from './data';
import {routerReducer} from 'react-router-redux';
import {userReducer} from './userReducer';
import {checkboxReducer} from './checkboxReducers';
import {Reducer} from 'redux';
import {alertReducer} from './alertReducer';
import {confirmationModalReducer} from './confirmationModalReducer';
import {navMenuReducer} from './navMenuReducer';
const {combineForms} = require<any>('react-redux-form');
const reduxFormReducer = require<any>('redux-form').reducer;

let rootReducer: Reducer<{}> = combineReducers({
    data,
    primaryNavOpen: primaryNavReducer,
    secondaryNavOpen: secondaryNavReducer,
    checkbox: checkboxReducer,
    alertDismissable: alertReducer,
    confirmationModal: confirmationModalReducer,
    userAction: userReducer,
    routing: routerReducer,
    navMenu: navMenuReducer,
    form: reduxFormReducer,
    forms: combineForms({rhForms: {}}),
});

export {rootReducer};
