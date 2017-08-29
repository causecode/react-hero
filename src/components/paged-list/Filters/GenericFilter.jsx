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
// Props type is any as any prop can be passed
var GenericFilter = (function (_super) {
    __extends(GenericFilter, _super);
    function GenericFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericFilter.prototype.render = function () {
        var input = this.props.input;
        return (<react_bootstrap_1.FormControl {...input} {...this.props}/>);
    };
    return GenericFilter;
}(React.Component));
exports.GenericFilter = GenericFilter;
