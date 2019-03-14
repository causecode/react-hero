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
var componentService_1 = require("../utils/componentService");
var ListPage = (function (_super) {
    __extends(ListPage, _super);
    function ListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListPage.prototype.render = function () {
        var resource = this.props.match.params.resource;
        var Page = componentService_1.ComponentService
            .getListPage(resource);
        return (React.createElement(Page, { resource: resource }));
    };
    return ListPage;
}(React.Component));
exports.ListPage = ListPage;
//# sourceMappingURL=ListPage.js.map