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
var Select = require('react-select');
var Creatable = require('react-select').Creatable;
require("react-select/dist/react-select.css");
exports.DropDownInputTemplate = function (props) {
    var handleChange = function (e) {
        props.onChange(e);
    };
    var multi = props.multi, creatable = props.creatable, autoBlur = props.autoBlur, autofocus = props.autofocus, propertyValue = props.propertyValue, options = props.options, style = props.style;
    var selectProps = {
        multi: multi || false,
        creatable: creatable || false,
        autoBlur: autoBlur || false,
        autofocus: autofocus || false,
        value: propertyValue || '',
        options: options || [],
    };
    if (props.onInputChange) {
        selectProps.onInputChange = props.onInputChange;
    }
    if (props.onInputKeyDown) {
        selectProps.onInputKeyDown = props.onInputKeyDown;
    }
    if (creatable) {
        return (React.createElement(Creatable, __assign({ onChange: handleChange, style: style && style.inputCSS || {} }, selectProps)));
    }
    else {
        return (React.createElement(Select, __assign({ onChange: handleChange, style: style && style.inputCSS || {} }, selectProps)));
    }
    ;
};
//# sourceMappingURL=DropDownInputTemplate.js.map