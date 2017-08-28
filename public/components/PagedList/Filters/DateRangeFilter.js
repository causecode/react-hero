"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var RangeFilter_1 = require("./RangeFilter");
function DateRangeFilter(_a) {
    var label = _a.label, paramName = _a.paramName, paramNameFrom = _a.paramNameFrom, paramNameTo = _a.paramNameTo, formatter = _a.formatter, parser = _a.parser;
    label = label || paramName;
    return (React.createElement(react_bootstrap_1.FormGroup, null,
        React.createElement(react_bootstrap_1.ControlLabel, null, label.capitalize()),
        React.createElement("strong", null, "From"),
        RangeFilter_1.renderRangeFilter(paramNameFrom || paramName + "From", 'date', formatter, parser),
        React.createElement("strong", null, "To"),
        RangeFilter_1.renderRangeFilter(paramNameTo || paramName + "From", 'date', formatter, parser)));
}
exports.DateRangeFilter = DateRangeFilter;
//# sourceMappingURL=DateRangeFilter.js.map