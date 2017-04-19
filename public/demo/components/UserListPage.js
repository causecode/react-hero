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
var react_router_1 = require("react-router");
var UserListPage = (function (_super) {
    __extends(UserListPage, _super);
    function UserListPage() {
        var _this = _super.apply(this, arguments) || this;
        _this.renderCustomAction = function (instance) {
            return (React.createElement("button", null, "testAction"));
        };
        return _this;
    }
    UserListPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", { style: { background: '#eea303' } }, "This is my user list page"),
            React.createElement(PagedList_1.PagedList, { resource: this.props.resource, max: 10, customActions: TestAction },
                React.createElement(DropDownFilter_1.DropDownFilter, { label: "status", paramName: "status", possibleValues: [
                        { label: 'Enable', value: 'enable' },
                        { label: 'Disable', value: 'disable' },
                        { label: 'Inactive', value: 'inactive' }
                    ] }),
                React.createElement(RangeFilter_1.RangeFilter, { label: "Bill Amount", paramName: "billAmount" }),
                React.createElement(DateRangeFilter_1.DateRangeFilter, { label: "Date Created", paramName: "dateCreated" }),
                React.createElement(DropDownFilter_1.DropDownFilter, { label: "types", paramName: "types", possibleValues: [
                        { label: 'Zoo', value: 'zoo' },
                        { label: 'Jungle', value: 'jungle' },
                        { label: 'Forest', value: 'forest' }
                    ] }),
                React.createElement(QueryFilter_1.QueryFilter, { label: "Search", paramName: "query", placeholder: "First Name, Last Name, Email" }))));
    };
    return UserListPage;
}(React.Component));
exports.UserListPage = UserListPage;
UserListPage.resourceName = 'user';
var TestAction = (function (_super) {
    __extends(TestAction, _super);
    function TestAction() {
        var _this = _super.apply(this, arguments) || this;
        _this.exportDetails = function () {
            alert(_this.props.instance.firstName + ' ' + _this.props.instance.lastName);
        };
        return _this;
    }
    TestAction.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("button", { onClick: this.exportDetails }, "Show Name"),
            "\u00A0\u00A0",
            React.createElement(react_router_1.Link, { to: "/user/show/" + this.props.instance.id }, "View")));
    };
    return TestAction;
}(React.Component));
exports.TestAction = TestAction;
//# sourceMappingURL=UserListPage.js.map