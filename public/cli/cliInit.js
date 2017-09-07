"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
require("../init");
require.extensions['.ejs'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
require.extensions['.css'] = function (module, filename) {
    module.exports = '';
};
//# sourceMappingURL=cliInit.js.map