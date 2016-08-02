"use strict";
var redux_1 = require('redux');
var rootReducer_1 = require('./components/common/reducers/rootReducer');
var initialState = {
    open: false
};
exports.store = redux_1.createStore(rootReducer_1.default, initialState, redux_1.compose(window.devToolsExtension ? window.devToolsExtension() : function (f) { return f; }));
//# sourceMappingURL=store.js.map