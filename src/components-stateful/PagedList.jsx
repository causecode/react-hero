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
var react_bootstrap_1 = require("react-bootstrap");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var modelActions_1 = require("../actions/modelActions");
var commonUtils_1 = require("../utils/commonUtils");
var modelService_1 = require("../utils/modelService");
var checkboxActions_1 = require("../actions/checkboxActions");
var BulkUserActions_1 = require("../components/paged-list/BulkUserActions");
var QueryFilter_1 = require("../components/paged-list/Filters/QueryFilter");
var DataGrid_1 = require("../components/paged-list/DataGrid");
var PagedListFilter_1 = require("../components/paged-list/Filters/PagedListFilter");
var OuterFilter_1 = require("../components/paged-list/Filters/OuterFilter");
require("../utils/appService");
var objectAssign = require('object-assign');
var FontAwesome = require('react-fontawesome');
var OuterFilter;
var PagedListImpl = (function (_super) {
    __extends(PagedListImpl, _super);
    function PagedListImpl(props) {
        var _this = _super.call(this) || this;
        _this.offset = 0;
        /*
         * Using any here because the type defined by react-bootstrap i.e. SelectCallback was not assignable here.
         * TODO Remove any in handlePagination.
         */
        _this.handlePagination = function (pageNumber, e) {
            if (pageNumber !== _this.props.activePage) {
                _this.props.resetCheckboxState();
            }
            _this.offset = (pageNumber - 1) * _this.props.max;
            _this.fetchInstanceList(_this.props.resource, { offset: _this.offset });
            _this.props.setPage(pageNumber, _this.props.resource);
            _this.props.resetCheckboxState();
            commonUtils_1.scrollToTop();
        };
        _this.renderUserActions = function () {
            if (_this.props.userActionsMap && _this.props.userActionsMap.length > 0) {
                return (<BulkUserActions_1.UserActions isDisabled={true} userActionsMap={_this.props.userActionsMap} totalCount={_this.props.totalCount}/>);
            }
            return null;
        };
        _this.renderPagedListFilters = function () {
            if (!_this.props.pagedListFilters) {
                return (<PagedListFilter_1.PagedListFilters resource={_this.props.resource} successCallBack={_this.props.successCallBack} failureCallBack={_this.props.failureCallBack}>
                    {_this.props.children}
                </PagedListFilter_1.PagedListFilters>);
            }
            if (typeof _this.props.pagedListFilters === 'function') {
                var CustomPagedListFilters = _this.props.pagedListFilters;
                return (<CustomPagedListFilters resource={_this.props.resource}>
                    {_this.props.children}
                </CustomPagedListFilters>);
            }
            return _this.props.pagedListFilters;
        };
        _this.renderDataGrid = function () {
            if (!_this.props.dataGrid) {
                return (<DataGrid_1.DataGrid instanceList={_this.props.instanceList} max={_this.props.max} offset={_this.props.offset || _this.offset} properties={_this.props.properties} handleRecordDelete={_this.props.handleRecordDelete} totalCount={_this.props.totalCount} showDefaultActions={_this.props.showDefaultActions} customActions={_this.props.customActions} style={_this.props.style} isBordered={_this.props.isBordered}/>);
            }
            if (typeof _this.props.dataGrid === 'function') {
                var CustomDataGrid = _this.props.dataGrid;
                return (<CustomDataGrid instanceList={_this.props.instanceList} max={_this.props.max} offset={_this.props.offset || _this.offset} properties={_this.props.properties} handleRecordDelete={_this.props.handleRecordDelete} totalCount={_this.props.totalCount} style={_this.props.style} isBordered={_this.props.isBordered}/>);
            }
            return _this.props.dataGrid;
        };
        if (!props.resource) {
            throw new Error('No resource name passed.');
        }
        return _this;
    }
    PagedListImpl.prototype.fetchInstanceList = function (resource, filters) {
        if (filters === void 0) { filters = {}; }
        if (!this.props.fetchInstanceList) {
            filters = this.props.filters ? objectAssign(filters, this.props.filters) : filters;
            if (this.props.max > 0) {
                filters.max = this.props.max;
            }
            modelService_1.ModelService.getModel(resource).list(filters);
        }
    };
    PagedListImpl.prototype.componentWillMount = function () {
        var resource = this.props.resource;
        this.fetchInstanceList(resource);
        OuterFilter = OuterFilter_1.createOuterFilterForm(this.props.resource + "Filters");
    };
    ;
    PagedListImpl.prototype.componentWillUnmount = function () {
        this.props.resetCheckboxState();
    };
    PagedListImpl.prototype.render = function () {
        var _a = this.props, activePage = _a.activePage, style = _a.style;
        var numberOfPages = this.props.max ? Math.ceil(this.props.totalCount / this.props.max) : 1;
        return (<div>
                {this.props.pageHeader ||
            <h2 className="caps">
                        {this.props.resource.capitalize()} List
                        <react_router_dom_1.Link to={"/" + this.props.resource + "/create"}>
                            <FontAwesome name="plus"/>
                        </react_router_dom_1.Link>
                    </h2>}

                <div>
                    <OuterFilter style={style.searchButton} resource={this.props.resource}>
                        <QueryFilter_1.QueryFilter placeholder="Search" paramName="query" label="Search"/>
                    </OuterFilter>
                </div>

                {this.renderPagedListFilters()}

                {this.renderUserActions()}

                {this.props.afterFilters}

                {this.renderDataGrid()}

                {this.props.pagination ||
            <react_bootstrap_1.Pagination prev next first last ellipsis boundaryLinks maxButtons={5} items={numberOfPages} activePage={activePage} onSelect={this.handlePagination}/>}
            </div>);
    };
    ;
    return PagedListImpl;
}(React.Component));
PagedListImpl.defaultProps = {
    properties: [],
    resource: '',
    max: 20,
    totalCount: 0,
    activePage: 1,
    instanceList: [],
    setPage: function (pageNumber) { return; },
    style: {
        searchButton: {},
        headerStyle: {},
        dataStyle: {},
        rowStyle: {},
    },
    isBordered: true,
};
exports.PagedListImpl = PagedListImpl;
function mapStateToProps(state, ownProps) {
    var resourceData = state.data.get(ownProps.resource + "List", {});
    resourceData = resourceData.toJS ? resourceData.toJS() : resourceData;
    return {
        properties: resourceData.properties,
        instanceList: resourceData.instanceList,
        totalCount: resourceData.totalCount,
        activePage: resourceData.activePage,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        setPage: function (pageNumber, resource) {
            dispatch(modelActions_1.setPage(pageNumber, resource));
        },
        resetCheckboxState: function () {
            dispatch(checkboxActions_1.resetCheckboxState());
        },
    };
}
var PagedList = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PagedListImpl);
exports.PagedList = PagedList;
