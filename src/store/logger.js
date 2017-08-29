"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createLogger = require('redux-logger');
var immutableToJs_1 = require("../utils/immutableToJs");
var logger = createLogger({
    collapsed: true,
    stateTransformer: function (state) {
        return immutableToJs_1.default(state);
    },
    predicate: function (getState, _a) {
        var type = _a.type;
        return type !== 'redux-form/BLUR' &&
            type !== 'redux-form/CHANGE' &&
            type !== 'redux-form/FOCUS' &&
            type !== 'redux-form/TOUCH';
    },
});
exports.default = logger;
