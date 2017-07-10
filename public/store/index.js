"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var rootReducer_1 = require("./../reducers/rootReducer");
var promiseMiddleware_1 = require("../middleware/promiseMiddleware");
var logger_1 = require("./logger");
var thunk = require('redux-thunk').default;
var configureMockStore = require('redux-mock-store').default;
function configureStore(initialState) {
    var store;
    if (process.env.NODE_ENV === 'test') {
        store = configureMockStore()(initialState);
    }
    else {
        store = redux_1.compose.apply(void 0, [_getMiddleware()].concat(_getEnhancers()))(redux_1.createStore)(rootReducer_1.rootReducer, initialState);
    }
    return store;
}
exports.configureStore = configureStore;
function _getMiddleware() {
    var middleware = [
        promiseMiddleware_1.promiseMiddleware,
        thunk,
    ];
    if (process.env.NODE_ENV === 'development') {
        middleware.push(logger_1.default);
    }
    return redux_1.applyMiddleware.apply(void 0, middleware);
}
function _getEnhancers() {
    var enhancers = [];
    if (typeof (window) !== 'undefined' && window.devToolsExtension) {
        enhancers = [window.devToolsExtension()];
    }
    return enhancers;
}
exports._getEnhancers = _getEnhancers;
exports.store = configureStore({});
//# sourceMappingURL=index.js.map