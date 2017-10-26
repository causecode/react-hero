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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Radium = require("radium");
var DynamicForm_1 = require("./DynamicForm");
var react_bootstrap_1 = require("react-bootstrap");
var modelActions_1 = require("../../../actions/modelActions");
var appService_1 = require("../../../utils/appService");
var store_1 = require("../../../store");
var ReactFontAwesome = require('react-fontawesome');
var FontAwesome = Radium(ReactFontAwesome);
var InnerFilterForm;
var PagedListFilters = (function (_super) {
    __extends(PagedListFilters, _super);
    function PagedListFilters() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggleFilters = function () {
            store_1.store.dispatch(modelActions_1.toggleFilters());
        };
        return _this;
    }
    PagedListFilters.prototype.componentWillMount = function () {
        InnerFilterForm = DynamicForm_1.createFilterForm(this.props.resource);
    };
    PagedListFilters.prototype.render = function () {
        var children = this.props.children;
        if (appService_1.isEmpty(children)) {
            return null;
        }
        return (React.createElement("div", { className: "paged-list-filters" },
            React.createElement(react_bootstrap_1.Button, { onClick: this.toggleFilters },
                React.createElement(FontAwesome, { name: "filter" })),
            React.createElement(InnerFilterForm, { resource: this.props.resource, path: this.props.path, filtersOpen: false, successCallBack: this.props.successCallBack, failureCallBack: this.props.failureCallBack }, children)));
    };
    return PagedListFilters;
}(React.Component));
PagedListFilters.defaultProps = {
    resource: '',
};
PagedListFilters = __decorate([
    Radium
], PagedListFilters);
exports.PagedListFilters = PagedListFilters;
//# sourceMappingURL=PagedListFilter.js.map