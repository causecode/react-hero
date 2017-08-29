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
/*
 * This Component is used to wrap Stateless Components in a div since React Test Utils cannot render a
 * Stateless Component directly while Testing.
 * https://github.com/facebook/react/issues/4692#issuecomment-163029873.
 */
var Wrapper = (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wrapper.prototype.render = function () {
        return (<div>
                {this.props.children}
            </div>);
    };
    return Wrapper;
}(React.Component));
exports.Wrapper = Wrapper;
