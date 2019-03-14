"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appService = require("./utils/appService");
var dotenv_1 = require("dotenv");
dotenv_1.config();
var isEmpty = appService.isEmpty || (function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
});
var _a = process.env, SERVER_URL = _a.SERVER_URL, API_URL = _a.API_URL;
if (isEmpty(API_URL)) {
    throw new Error('ApiUrl must be defined.');
}
if (isEmpty(SERVER_URL)) {
    throw new Error('Server URL must be defined.');
}
var reactHeroConfig = {
    serverUrl: SERVER_URL, APIUrl: API_URL,
};
exports.config = reactHeroConfig;
//# sourceMappingURL=config.js.map