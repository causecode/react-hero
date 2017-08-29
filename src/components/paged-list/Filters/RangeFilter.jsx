"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var GenericFilter_1 = require("./GenericFilter");
var Field = require('redux-form').Field;
function RangeFilter(_a) {
    var label = _a.label, paramName = _a.paramName, type = _a.type, paramNameFrom = _a.paramNameFrom, paramNameTo = _a.paramNameTo;
    label = label || paramName;
    return (<react_bootstrap_1.FormGroup>
            <react_bootstrap_1.ControlLabel>{label.capitalize()}</react_bootstrap_1.ControlLabel>

            <strong>From</strong>
            {renderRangeFilter(paramNameFrom || paramName + "From", type || 'text')}

            <strong>To</strong>
            {renderRangeFilter(paramNameTo || paramName + "To", type || 'text')}
        </react_bootstrap_1.FormGroup>);
}
exports.RangeFilter = RangeFilter;
function renderRangeFilter(paramName, type, formatter, parser) {
    return (<Field type={type} name={paramName} component={GenericFilter_1.GenericFilter} format={formatter} parse={parser}/>);
}
exports.renderRangeFilter = renderRangeFilter;
