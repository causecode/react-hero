"use strict";
var redux_1 = require("redux");
var open_1 = require("./open");
var data_1 = require("./data");
var react_router_redux_1 = require("react-router-redux");
var userReducer_1 = require("./userReducer");
var checkboxReducers_1 = require("./checkboxReducers");
var alertReducer_1 = require("./alertReducer");
var confirmationModalReducer_1 = require("./confirmationModalReducer");
var combineForms = require('react-redux-form').combineForms;
var reduxFormReducer = require('redux-form').reducer;
var rootReducer = redux_1.combineReducers({
    open: open_1.open,
    data: data_1.dataReducer,
    checkbox: checkboxReducers_1.checkboxReducer,
    alertDismissable: alertReducer_1.alertReducer,
    confirmationModal: confirmationModalReducer_1.confirmationModalReducer,
    userAction: userReducer_1.userReducer,
    routing: react_router_redux_1.routerReducer,
    form: reduxFormReducer,
    forms: combineForms({ rhForms: {} }),
});
exports.rootReducer = rootReducer;
//# sourceMappingURL=rootReducer.js.map