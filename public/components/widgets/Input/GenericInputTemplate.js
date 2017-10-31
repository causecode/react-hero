"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.GenericInputTemplate = function (props) {
    var type = props.type, style = props.style, propertyValue = props.propertyValue;
    var handleChange = function (e) {
        props.onChange(e.target["value"]);
    };
    var inputProps = props.onBlur ? { onBlur: handleChange } : { onChange: handleChange };
    return (React.createElement("input", __assign({ type: type, style: style && style.inputCSS ? style.inputCSS : {}, className: "form-control", defaultValue: propertyValue }, inputProps)));
};
//# sourceMappingURL=GenericInputTemplate.js.map