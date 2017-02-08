"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
require("../../../utils/appService");
function DropDownFilter(_a, _b) {
    var label = _a.label, paramName = _a.paramName, possibleValues = _a.possibleValues, fields = _a.fields;
    label = label ? label : paramName;
    return (React.createElement(react_bootstrap_1.FormGroup, null,
        React.createElement(react_bootstrap_1.ControlLabel, null, label.capitalize()),
        React.createElement(react_bootstrap_1.FormControl, __assign({ componentClass: "select" }, fields[0]), possibleValues.map(function (value) {
            return (React.createElement("option", { key: possibleValues.indexOf(value), value: value }, value));
        }))));
}
exports.DropDownFilter = DropDownFilter;
//# sourceMappingURL=DropDownFilter.js.map