"use strict";
var reducers_1 = require('./components/common/reducers/reducers');
var redux_1 = require('redux');
var react_router_redux_1 = require('react-router-redux');
var redux_2 = require('redux');
var initialState = {
    open: false
};
exports.store = redux_1.createStore(redux_2.combineReducers({
    open: reducers_1.open,
    routing: react_router_redux_1.routerReducer
}), initialState, redux_1.compose(window.devToolsExtension ? window.devToolsExtension() : function (f) { return f; }));
//# sourceMappingURL=store.js.map