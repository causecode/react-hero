"use strict";
var commandLine_1 = require("./commandLine");
exports.projectRoot = commandLine_1.commandLine.development ? '../..' : '../../../..';
exports.config = require(exports.projectRoot + '/tsconfig.json');
if (!exports.config || !exports.config.compilerOptions) {
    throw new Error('Could not find typescript configuration. ' +
        'Make sure you have created a tsconfig.json in your project root with a rootDir and outDir. ');
}
exports.typescriptRoot = '/' + exports.config.compilerOptions.rootDir;
exports.typescriptOut = '/' + exports.config.compilerOptions.outDir;
if (!exports.typescriptRoot) {
    throw new Error('rootDir not defined in tsconfig.json');
}
if (!exports.typescriptOut) {
    throw new Error('outDir not defined in tsconfig.json');
}
//# sourceMappingURL=projectConfig.js.map