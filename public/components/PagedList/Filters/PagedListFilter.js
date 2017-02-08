"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var DynamicForm_1 = require("./DynamicForm");
var react_bootstrap_1 = require("react-bootstrap");
var store_1 = require("../../../store");
var modelActions_1 = require("../../../actions/modelActions");
var appService_1 = require("../../../utils/appService");
var InnerFilterForm;
var PagedListFilters = (function (_super) {
    __extends(PagedListFilters, _super);
    function PagedListFilters() {
        var _this = _super.apply(this, arguments) || this;
        _this.filterProps = [];
        return _this;
    }
    PagedListFilters.prototype.constructFilters = function () {
        var _this = this;
        var children = this.props.children;
        React.Children.forEach(children, function (child) {
            var paramName = child.props.paramName;
            var filterName = child.type.name;
            if (['RangeFilter', 'DateRangeFilter'].indexOf(filterName) !== -1) {
                _this.filterProps.push(paramName + "From", paramName + "To");
            }
            else if (child.props.paramName) {
                _this.filterProps.push(child.props.paramName);
            }
        });
    };
    PagedListFilters.prototype.toggleFilters = function () {
        store_1.store.dispatch(modelActions_1.toggleFilters());
    };
    PagedListFilters.prototype.render = function () {
        InnerFilterForm = DynamicForm_1.createFilterForm(this.props.resource);
        this.constructFilters();
        var children = this.props.children;
        if (appService_1.isEmpty(children)) {
            return React.createElement("div", null);
        }
        return (React.createElement("div", { className: "paged-list-filters" },
            React.createElement(react_bootstrap_1.Button, { onClick: this.toggleFilters },
                React.createElement("i", { className: "fa fa-filter" })),
            React.createElement(InnerFilterForm, { fields: this.filterProps, resource: this.props.resource, filtersOpen: false }, children)));
    };
    return PagedListFilters;
}(React.Component));
exports.PagedListFilters = PagedListFilters;
PagedListFilters.defaultProps = {
    resource: ''
};
//# sourceMappingURL=PagedListFilter.js.map