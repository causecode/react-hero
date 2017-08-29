"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var RangeFilter_1 = require("./RangeFilter");
function DateRangeFilter(_a) {
    var label = _a.label, paramName = _a.paramName, paramNameFrom = _a.paramNameFrom, paramNameTo = _a.paramNameTo, formatter = _a.formatter, parser = _a.parser;
    label = label || paramName;
    return (<react_bootstrap_1.FormGroup>
            <react_bootstrap_1.ControlLabel>{label.capitalize()}</react_bootstrap_1.ControlLabel>

            <strong>From</strong>
            {RangeFilter_1.renderRangeFilter(paramNameFrom || paramName + "From", 'date', formatter, parser)}

            <strong>To</strong>
            {RangeFilter_1.renderRangeFilter(paramNameTo || paramName + "From", 'date', formatter, parser)}

        </react_bootstrap_1.FormGroup>);
}
exports.DateRangeFilter = DateRangeFilter;
