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
var GenericFilter = (function (_super) {
    __extends(GenericFilter, _super);
    function GenericFilter() {
        return _super.apply(this, arguments) || this;
    }
    GenericFilter.prototype.render = function () {
        var input = this.props.input;
        return (React.createElement(react_bootstrap_1.FormControl, __assign({}, input, this.props)));
    };
    return GenericFilter;
}(React.Component));
exports.GenericFilter = GenericFilter;
//# sourceMappingURL=GenericFilter.js.map