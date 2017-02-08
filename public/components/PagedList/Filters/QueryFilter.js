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
function QueryFilter(_a, _b) {
    var label = _a.label, placeholder = _a.placeholder, fields = _a.fields, paramName = _a.paramName;
    label = label ? label : paramName;
    return (React.createElement(react_bootstrap_1.FormGroup, { className: "query-filter" },
        React.createElement(react_bootstrap_1.ControlLabel, null, label.capitalize()),
        React.createElement(react_bootstrap_1.FormControl, __assign({ type: "text", placeholder: placeholder.join(', ') }, fields[0]))));
}
exports.QueryFilter = QueryFilter;
//# sourceMappingURL=QueryFilter.js.map