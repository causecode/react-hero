"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var DropDownSelect = (function (_super) {
    __extends(DropDownSelect, _super);
    function DropDownSelect() {
        var _this = _super.apply(this, arguments) || this;
        _this.renderOptions = function () {
            var options = [];
            var possibleValues = _this.props.possibleValues;
            if (possibleValues && possibleValues.length > 0) {
                possibleValues.forEach(function (item, index) {
                    options.push(React.createElement("option", { key: index, value: item.value }, item.label));
                });
            }
            return options;
        };
        return _this;
    }
    DropDownSelect.prototype.render = function () {
        var input = this.props.input;
        return (React.createElement(react_bootstrap_1.FormControl, __assign({ componentClass: "select" }, input),
            React.createElement("option", { value: "" }, "Select One"),
            this.renderOptions()));
    };
    return DropDownSelect;
}(React.Component));
exports.DropDownSelect = DropDownSelect;
//# sourceMappingURL=DropDownSelect.js.map