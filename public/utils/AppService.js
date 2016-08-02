"use strict";
var AppService = (function () {
    function AppService() {
        this.defaultConfig = {
            alertType: 'info',
            alertTimeOut: 1000
        };
    }
    AppService.prototype.setDefaults = function (overrideConfig) {
        Object.assign(this.defaultConfig, overrideConfig);
    };
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=AppService.js.map