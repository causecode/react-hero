"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var PagedListFilter_1 = require("../components/PagedList/Filters/PagedListFilter");
var DataGrid_1 = require("../components/PagedList/DataGrid");
var modelActions_1 = require("../actions/modelActions");
var react_router_1 = require("react-router");
var react_redux_1 = require("react-redux");
var modelService_1 = require("../utils/modelService");
require("../utils/appService");
var PagedListImpl = (function (_super) {
    __extends(PagedListImpl, _super);
    function PagedListImpl(props) {
        var _this = _super.call(this) || this;
        _this.handlePagination = function (pageNumber, e) {
            _this.fetchInstanceList(_this.props.resource, { offset: (pageNumber - 1) * _this.props.max });
            _this.props.setPage(pageNumber, _this.props.resource);
        };
        if (!props.resource) {
            throw new Error('No resource name passed.');
        }
        return _this;
    }
    PagedListImpl.prototype.fetchInstanceList = function (resource, filters) {
        if (filters === void 0) { filters = {}; }
        if (this.props.max > 0) {
            filters.max = this.props.max;
        }
        modelService_1.ModelService.getModel(resource).list(filters);
    };
    PagedListImpl.prototype.componentWillMount = function () {
        var resource = this.props.resource;
        this.fetchInstanceList(resource);
    };
    ;
    PagedListImpl.prototype.render = function () {
        var activePage = this.props.activePage;
        var items = this.props.max ? Math.ceil(this.props.totalCount / this.props.max) : 1;
        return (React.createElement("div", null,
            React.createElement("h2", { className: "caps" },
                this.props.resource.capitalize(),
                " List",
                React.createElement(react_router_1.Link, { to: this.props.resource + "/create" },
                    React.createElement("i", { className: "fa fa-plus" }))),
            React.createElement(PagedListFilter_1.PagedListFilters, { resource: this.props.resource }, this.props.children),
            React.createElement(DataGrid_1.DataGrid, { instanceList: this.props.instanceList, properties: this.props.properties }),
            React.createElement(react_bootstrap_1.Pagination, { prev: true, next: true, first: true, last: true, ellipsis: true, boundaryLinks: true, maxButtons: 5, items: items, activePage: activePage, onSelect: this.handlePagination })));
    };
    ;
    return PagedListImpl;
}(React.Component));
exports.PagedListImpl = PagedListImpl;
PagedListImpl.defaultProps = {
    properties: [],
    resource: '',
    max: 20,
    totalCount: 0,
    activePage: 1,
    instanceList: [],
    setPage: function (pageNumber) { return; }
};
function mapStateToProps(state, ownProps) {
    var resourceData = state.data.get(ownProps.resource + "List", {});
    resourceData = resourceData.toJS ? resourceData.toJS() : resourceData;
    return {
        properties: resourceData.properties,
        instanceList: resourceData.instanceList,
        totalCount: resourceData.totalCount,
        activePage: resourceData.activePage
    };
}
function mapDispatchToProps(dispatch) {
    return {
        setPage: function (pageNumber, resource) {
            dispatch(modelActions_1.setPage(pageNumber, resource));
        }
    };
}
var PagedList = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PagedListImpl);
exports.PagedList = PagedList;
//# sourceMappingURL=PagedList.js.map