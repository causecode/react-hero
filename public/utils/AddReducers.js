"use strict";
var reducers_1 = require('../components/common/reducers/reducers');
var redux_1 = require('redux');
exports.addReducers = function (userReducers) {
    return redux_1.combineReducers({
        userReducers: userReducers,
        open: reducers_1.open
    });
};
//# sourceMappingURL=AddReducers.js.map