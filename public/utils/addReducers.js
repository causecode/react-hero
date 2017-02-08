"use strict";
var open_1 = require("../reducers/open");
var redux_1 = require("redux");
var react_router_redux_1 = require("react-router-redux");
var data_1 = require("../reducers/data");
var objectAssign = require('object-assign');
var combineForms = require('react-redux-form').combineForms;
var reduxFormReducer = require('redux-form').reducer;
exports.addReducers = function (ReducerConfig) {
    return redux_1.combineReducers(objectAssign({}, ReducerConfig, {
        open: open_1.open,
        data: data_1.dataReducer,
        routing: react_router_redux_1.routerReducer,
        form: reduxFormReducer,
        forms: combineForms({ rhForms: {} })
    }));
};
//# sourceMappingURL=addReducers.js.map