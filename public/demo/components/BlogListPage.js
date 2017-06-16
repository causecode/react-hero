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
var PagedList_1 = require("../../components-stateful/PagedList");
var QueryFilter_1 = require("../../components/PagedList/Filters/QueryFilter");
var RangeFilter_1 = require("../../components/PagedList/Filters/RangeFilter");
var DropDownFilter_1 = require("../../components/PagedList/Filters/DropDownFilter");
var DateRangeFilter_1 = require("../../components/PagedList/Filters/DateRangeFilter");
var AutocompleteQueryFilter_1 = require("../../components/PagedList/Filters/AutocompleteQueryFilter");
var BlogListPage = (function (_super) {
    __extends(BlogListPage, _super);
    function BlogListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlogListPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, "This is a list page"),
            React.createElement(PagedList_1.PagedList, { resource: this.props.resource, max: 10 },
                React.createElement(DropDownFilter_1.DropDownFilter, { label: "status", paramName: "status", possibleValues: [
                        { label: 'Enable', value: 'enable' },
                        { label: 'Disable', value: 'disable' },
                        { label: 'Inactive', value: 'inactive' },
                    ] }),
                React.createElement(RangeFilter_1.RangeFilter, { type: "number", label: "Bill Amount", paramName: "billAmount" }),
                React.createElement(DateRangeFilter_1.DateRangeFilter, { label: "Date Created", paramName: "dateCreated" }),
                React.createElement(DropDownFilter_1.DropDownFilter, { label: "types", paramName: "types", possibleValues: [
                        { label: 'Zoo', value: 'zoo' },
                        { label: 'Jungle', value: 'jungle' },
                        { label: 'Forest', value: 'forest' },
                    ] }),
                React.createElement(QueryFilter_1.QueryFilter, { label: "Search", paramName: "query", placeholder: "First Name, Last Name, Email" }),
                React.createElement(AutocompleteQueryFilter_1.AutocompleteQueryFilter, { multi: true, style: { width: '350px' }, paramName: "autoQuery", options: [
                        { label: 'Zoo', value: 'zoo' },
                        { label: 'Jungle', value: 'jungle' },
                        { label: 'Forest', value: 'forest' },
                    ] }))));
    };
    return BlogListPage;
}(React.Component));
BlogListPage.resourceName = 'blog';
exports.BlogListPage = BlogListPage;
//# sourceMappingURL=BlogListPage.js.map