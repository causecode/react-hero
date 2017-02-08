"use strict";
var redux_1 = require("redux");
var open_1 = require("./open");
var data_1 = require("./data");
var reduxFormReducer = require('redux-form').reducer;
var react_router_redux_1 = require("react-router-redux");
var combineForms = require('react-redux-form').combineForms;
var rootReducer = redux_1.combineReducers({
    open: open_1.open,
    data: data_1.dataReducer,
    routing: react_router_redux_1.routerReducer,
    form: reduxFormReducer,
    forms: combineForms({ rhForms: {} })
});
exports.rootReducer = rootReducer;
//# sourceMappingURL=rootReducer.js.map