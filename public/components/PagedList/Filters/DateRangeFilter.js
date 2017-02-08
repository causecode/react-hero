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
function DateRangeFilter(_a, _b) {
    var label = _a.label, paramName = _a.paramName, fields = _a.fields;
    label = label ? label : paramName;
    return (React.createElement(react_bootstrap_1.FormGroup, null,
        React.createElement(react_bootstrap_1.ControlLabel, null, label.capitalize()),
        React.createElement("strong", null, "From"),
        React.createElement(react_bootstrap_1.FormControl, __assign({ type: "date" }, fields[0])),
        React.createElement("strong", null, "To"),
        React.createElement(react_bootstrap_1.FormControl, __assign({ type: "date" }, fields[1]))));
}
exports.DateRangeFilter = DateRangeFilter;
//# sourceMappingURL=DateRangeFilter.js.map