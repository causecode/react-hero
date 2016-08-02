"use strict";
var open_1 = require('../components/common/reducers/open');
var redux_1 = require('redux');
exports.addReducers = function (userReducers) {
    return redux_1.combineReducers({
        userReducers: userReducers,
        open: open_1.default
    });
};
//# sourceMappingURL=AddReducers.js.map