"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../store/index");
var userActions_1 = require("../actions/userActions");
function clearUserAction() {
    index_1.store.dispatch(userActions_1.resetUserAction());
}
exports.clearUserAction = clearUserAction;
//# sourceMappingURL=userActionUtils.js.map