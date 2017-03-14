"use strict";
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var GenericFilter_1 = require("./GenericFilter");
var Field = require('redux-form').Field;
function QueryFilter(_a) {
    var label = _a.label, placeholder = _a.placeholder, paramName = _a.paramName;
    label = label || paramName;
    return (React.createElement(react_bootstrap_1.FormGroup, { className: "query-filter" },
        React.createElement(react_bootstrap_1.ControlLabel, null, label.capitalize()),
        React.createElement(Field, { type: "text", name: paramName, component: GenericFilter_1.GenericFilter, placeholder: placeholder })));
}
exports.QueryFilter = QueryFilter;
//# sourceMappingURL=QueryFilter.js.map