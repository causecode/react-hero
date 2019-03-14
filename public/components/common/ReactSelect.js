"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Select = require('react-select').default;
require("react-select/dist/react-select.css");
var ReactSelect = (function (_super) {
    __extends(ReactSelect, _super);
    function ReactSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (value) {
            if (value && value.constructor === Array) {
                _this.props.input.onChange(value.slice());
            }
            else {
                _this.props.input.onChange(value);
            }
        };
        _this.handleBlur = function (value) {
            if (value && value.constructor === Array) {
                _this.props.input.onBlur(value.slice());
            }
            else if (value && value.length > 0) {
                _this.props.input.onBlur(value);
            }
        };
        return _this;
    }
    ReactSelect.prototype.render = function () {
        var selectProps = {
            name: 'select',
            multi: this.props.multi,
            options: this.props.options,
            value: this.props.input.value || '',
            style: this.props.style,
        };
        if (this.props.onInputChange) {
            selectProps.onInputChange = this.props.onInputChange;
        }
        return (React.createElement(Select, __assign({}, selectProps, { onChange: this.handleChange, onBlur: this.handleBlur })));
    };
    return ReactSelect;
}(React.Component));
exports.ReactSelect = ReactSelect;
//# sourceMappingURL=ReactSelect.js.map