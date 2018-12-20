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
var moment = require("moment");
var ReusableComponents_1 = require("../../ReusableComponents");
var DateTimeComponent = (function (_super) {
    __extends(DateTimeComponent, _super);
    function DateTimeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (e) {
            _this.props.change(_this.props.model, e.target["value"]);
        };
        return _this;
    }
    DateTimeComponent.prototype.render = function () {
        var _a = this.props, style = _a.style, propertyValue = _a.propertyValue, htmlAttributes = _a.htmlAttributes;
        return (React.createElement(ReusableComponents_1.FormControl, __assign({ type: "date", style: style ? style.inputCSS : {}, onChange: this.handleChange, value: propertyValue ? moment(propertyValue).format('YYYY-MM-DD') : '' }, htmlAttributes)));
    };
    return DateTimeComponent;
}(React.Component));
exports.DateTimeComponent = DateTimeComponent;
//# sourceMappingURL=DateTimeComponent.js.map