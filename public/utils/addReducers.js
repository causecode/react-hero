"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var primaryNavReducer_1 = require("../reducers/primaryNavReducer");
var secondaryNavReducer_1 = require("../reducers/secondaryNavReducer");
var redux_1 = require("redux");
var react_router_redux_1 = require("react-router-redux");
var data_1 = require("../reducers/data");
var checkboxReducers_1 = require("../reducers/checkboxReducers");
var userReducer_1 = require("../reducers/userReducer");
var alertReducer_1 = require("../reducers/alertReducer");
var navMenuReducer_1 = require("../reducers/navMenuReducer");
var confirmationModalReducer_1 = require("../reducers/confirmationModalReducer");
var combineForms = require('react-redux-form').combineForms;
var reduxFormReducer = require('redux-form').reducer;
var objectAssign = require('object-assign');
exports.addReducers = function (ReducerConfig) {
    return redux_1.combineReducers(objectAssign({}, ReducerConfig, {
        data: data_1.dataReducer,
        primaryNavOpen: primaryNavReducer_1.primaryNavReducer,
        secondaryNavOpen: secondaryNavReducer_1.secondaryNavReducer,
        routing: react_router_redux_1.routerReducer,
        form: reduxFormReducer,
        checkbox: checkboxReducers_1.checkboxReducer,
        alertDismissable: alertReducer_1.alertReducer,
        confirmationModal: confirmationModalReducer_1.confirmationModalReducer,
        userAction: userReducer_1.userReducer,
        navMenu: navMenuReducer_1.navMenuReducer,
        forms: combineForms({ rhForms: {} }),
    }));
};
//# sourceMappingURL=addReducers.js.map