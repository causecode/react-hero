"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var DropDownSelect_1 = require("./DropDownSelect");
var Field = require('redux-form').Field;
function DropDownFilter(_a) {
    var label = _a.label, paramName = _a.paramName, possibleValues = _a.possibleValues;
    label = label || paramName;
    return (React.createElement(react_bootstrap_1.FormGroup, null,
        React.createElement(react_bootstrap_1.ControlLabel, null, label.capitalize()),
        React.createElement(Field, { name: paramName, component: DropDownSelect_1.DropDownSelect, possibleValues: possibleValues })));
}
exports.DropDownFilter = DropDownFilter;
//# sourceMappingURL=DropDownFilter.js.map