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
var BlogAction = (function (_super) {
    __extends(BlogAction, _super);
    function BlogAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlogAction.prototype.render = function () {
        return (React.createElement("button", null, "testActionForBlog"));
    };
    return BlogAction;
}(React.Component));
exports.BlogAction = BlogAction;
//# sourceMappingURL=BlogAction.js.map