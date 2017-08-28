"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var PagedList_1 = require("../../components-stateful/PagedList");
var GenericListPage = (function (_super) {
    __extends(GenericListPage, _super);
    function GenericListPage() {
        return _super.apply(this, arguments) || this;
    }
    GenericListPage.prototype.render = function () {
        return (React.createElement("div", { className: "generic-list-page" },
            React.createElement(PagedList_1.PagedList, { resource: this.props.resource, max: 20 })));
    };
    return GenericListPage;
}(React.Component));
exports.GenericListPage = GenericListPage;
GenericListPage.defaultProps = {
    resource: ''
};
//# sourceMappingURL=GenericListPage.js.map