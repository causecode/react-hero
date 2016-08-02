"use strict";
var redux_1 = require('redux');
var open_1 = require('./open');
var react_router_redux_1 = require('react-router-redux');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_1.combineReducers({
    open: open_1.default,
    routing: react_router_redux_1.routerReducer
});
//# sourceMappingURL=rootReducer.js.map