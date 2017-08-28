"use strict";
var appService = require("./utils/appService");
var packageJson = require('../../../package.json');
var localConfigJson = require('../../../localConfig.json');
var isEmpty = appService.isEmpty || (function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
});
var getEnvironment = appService.getEnvironment || (function () { return ''; });
localConfigJson = isEmpty(localConfigJson) ? packageJson : localConfigJson;
var config = (getEnvironment() === 'production') ? packageJson : localConfigJson;
var reactHeroConfig = config.reactHero;
exports.config = reactHeroConfig;
//# sourceMappingURL=config.js.map