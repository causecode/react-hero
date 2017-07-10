"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
function immutableToJS(state) {
    return Object.keys(state).reduce(function (newState, key) {
        var val = state[key];
        newState[key] = immutable_1.Iterable.isIterable(val) ? val.toJS() : val;
        return newState;
    }, {});
}
exports.default = immutableToJS;
//# sourceMappingURL=immutableToJs.js.map