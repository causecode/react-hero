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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var DropDownSelect = (function (_super) {
    __extends(DropDownSelect, _super);
    function DropDownSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderOptions = function () {
            var options = [];
            var possibleValues = _this.props.possibleValues;
            if (possibleValues && possibleValues.length > 0) {
                possibleValues.forEach(function (item, index) {
                    options.push(<option key={index} value={item.value}>
                        {item.label}
                    </option>);
                });
            }
            return options;
        };
        return _this;
    }
    DropDownSelect.prototype.render = function () {
        var input = this.props.input;
        return (<react_bootstrap_1.FormControl componentClass="select" {...input}>
                <option value="">Select One</option>
                {this.renderOptions()}
            </react_bootstrap_1.FormControl>);
    };
    return DropDownSelect;
}(React.Component));
exports.DropDownSelect = DropDownSelect;
