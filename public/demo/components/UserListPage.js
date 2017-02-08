"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var DropDownFilter_1 = require("../../components/PagedList/Filters/DropDownFilter");
var PagedList_1 = require("../../components-stateful/PagedList");
var RangeFilter_1 = require("../../components/PagedList/Filters/RangeFilter");
var DateRangeFilter_1 = require("../../components/PagedList/Filters/DateRangeFilter");
var QueryFilter_1 = require("../../components/PagedList/Filters/QueryFilter");
var UserListPage = (function (_super) {
    __extends(UserListPage, _super);
    function UserListPage() {
        return _super.apply(this, arguments) || this;
    }
    UserListPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", { style: { background: 'red' } }, "This is MY user list page"),
            React.createElement(PagedList_1.PagedList, { resource: this.props.resource, max: 10 },
                React.createElement(DropDownFilter_1.DropDownFilter, { label: "status", paramName: "status", possibleValues: ['enable', 'disable', 'inactive'] }),
                React.createElement(RangeFilter_1.RangeFilter, { label: "Bill Amount", paramName: "billAmount" }),
                React.createElement(DateRangeFilter_1.DateRangeFilter, { label: "Date Created", paramName: "dateCreated" }),
                React.createElement(DropDownFilter_1.DropDownFilter, { label: "types", paramName: "types", possibleValues: ['Zoo', 'Jungle', 'Forest'] }),
                React.createElement(QueryFilter_1.QueryFilter, { label: "Search", paramName: "query", placeholder: ['First Name', 'Last Name', 'Email'] }))));
    };
    return UserListPage;
}(React.Component));
exports.UserListPage = UserListPage;
UserListPage.resourceName = 'user';
//# sourceMappingURL=UserListPage.js.map