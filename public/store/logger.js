"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = logger;
//# sourceMappingURL=logger.js.map