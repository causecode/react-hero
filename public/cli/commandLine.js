"use strict";
var commandLine = (function (argv) {
    var flags = argv
        .slice(1, argv.length)
        .filter(function (value) { return value.indexOf('--') > -1; });
    var argumentMap = {};
    flags.forEach(function (flag) {
        if (flag.indexOf('--') > -1) {
            argumentMap[flag.slice(2)] = argv[argv.indexOf(flag) + 1];
        }
    });
    return argumentMap;
})(process.argv);
exports.commandLine = commandLine;
//# sourceMappingURL=commandLine.js.map