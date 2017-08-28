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
var ReactSelect_1 = require("../../common/ReactSelect");
var Field = require('redux-form').Field;
function AutocompleteQueryFilter(props) {
    var label = props.label || props.paramName;
    return (React.createElement(react_bootstrap_1.FormGroup, null,
        React.createElement(react_bootstrap_1.ControlLabel, null, label.capitalize()),
        React.createElement(Field, __assign({}, props, { name: props.paramName, normalize: props.normalizer || normalizer, component: ReactSelect_1.ReactSelect }))));
}
exports.AutocompleteQueryFilter = AutocompleteQueryFilter;
function normalizer(option, previousValue, allValues, previousAllValues) {
    if (option && option.constructor === Array) {
        return option.map(function (item) {
            return item.value;
        });
    }
    if (option) {
        return option.value;
    }
    return '';
}
exports.normalizer = normalizer;
//# sourceMappingURL=AutocompleteQueryFilter.js.map