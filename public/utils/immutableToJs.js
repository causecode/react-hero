"use strict";
var immutable_1 = require("immutable");
function immutableToJS(state) {
    return Object.keys(state).reduce(function (newState, key) {
        var val = state[key];
        newState[key] = immutable_1.Iterable.isIterable(val) ? val.toJS() : val;
        return newState;
    }, {});
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = immutableToJS;
//# sourceMappingURL=immutableToJs.js.map