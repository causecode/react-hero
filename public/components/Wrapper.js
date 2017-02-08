"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Wrapper = (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper() {
        return _super.apply(this, arguments) || this;
    }
    Wrapper.prototype.render = function () {
        return (React.createElement("div", null, this.props.children));
    };
    return Wrapper;
}(React.Component));
exports.Wrapper = Wrapper;
//# sourceMappingURL=Wrapper.js.map