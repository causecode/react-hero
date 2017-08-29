"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var DropDownSelect_1 = require("./DropDownSelect");
var Field = require('redux-form').Field;
function DropDownFilter(_a) {
    var label = _a.label, paramName = _a.paramName, possibleValues = _a.possibleValues;
    label = label || paramName;
    return (<react_bootstrap_1.FormGroup>
            <react_bootstrap_1.ControlLabel>{label.capitalize()}</react_bootstrap_1.ControlLabel>
            <Field name={paramName} component={DropDownSelect_1.DropDownSelect} possibleValues={possibleValues}/>
        </react_bootstrap_1.FormGroup>);
}
exports.DropDownFilter = DropDownFilter;
