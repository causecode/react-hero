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
jest.unmock('../src/components-stateful/paged-list');
jest.mock('../src/utils/appService');
var React = require("react");
var immutable_1 = require("immutable");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var react_bootstrap_1 = require("react-bootstrap");
var enzyme_1 = require("enzyme");
var store_1 = require("../src/store");
var modelActions_1 = require("../src/actions/modelActions");
var modelService_1 = require("../src/utils/modelService");
var checkboxActions_1 = require("../src/actions/checkboxActions");
var TestModel_1 = require("./testData/TestModel");
var BulkUserActions_1 = require("../src/components/paged-list/BulkUserActions");
var QueryFilter_1 = require("../src/components/paged-list/Filters/QueryFilter");
var DataGrid_1 = require("../src/components/paged-list/DataGrid");
var PagedListFilter_1 = require("../src/components/paged-list/Filters/PagedListFilter");
var PagedList_1 = require("../src/components-stateful/PagedList");
require("../src/init");
var FontAwesome = require('react-fontawesome');
var unroll = require('unroll');
unroll.use(it);
describe('Test cases for paged-list', function () {
    it('should throw an error when resource name is not passed', function () {
        expect(function () {
            enzyme_1.shallow(<PagedList_1.PagedListImpl max={10} resource=""/>);
        }).toThrowError('No resource name passed.');
    });
    modelService_1.ModelService.register(TestModel_1.TestModel);
    modelService_1.ModelService.getModel = jest.fn(function (resource) {
        return TestModel_1.TestModel;
    });
    TestModel_1.TestModel.list = jest.fn(function () {
        return [];
    });
    var pagedList = enzyme_1.shallow(<PagedList_1.PagedListImpl max={10} resource="test"/>);
    modelActions_1.setPage = jest.fn(function () {
        return {
            type: 'DUMMY',
        };
    });
    checkboxActions_1.resetCheckboxState = jest.fn(function () {
        return {
            type: 'DUMMY',
        };
    });
    store_1.store.dispatch = jest.fn();
    it('should call list method with max prop when component mounts', function () {
        expect(TestModel_1.TestModel.list).toBeCalledWith({ max: 10 });
    });
    unroll('should render #componentName #count', function (done, args) {
        expect(pagedList.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['componentName', 'component', 'count'],
        ['h2', 'h2', 1],
        ['Link', react_router_dom_1.Link, 1],
        ['FontAwesome', FontAwesome, 1],
        ['QueryFilter', QueryFilter_1.QueryFilter, 1],
        ['PagedListFilters', PagedListFilter_1.PagedListFilters, 1],
        ['DataGrid', DataGrid_1.DataGrid, 1],
        ['Pagination', react_bootstrap_1.Pagination, 1],
    ]);
    it('should not call list method when custom fetchInstanceList method is provided as prop', function () {
        var customFetchInstanceList = jest.fn();
        TestModel_1.TestModel.list.mockReset();
        enzyme_1.shallow(<PagedList_1.PagedListImpl max={10} resource="test" fetchInstanceList={customFetchInstanceList}/>);
        expect(TestModel_1.TestModel.list).not.toBeCalled();
    });
    it('should render custom page header when pageHeader prop is passed', function () {
        expect(pagedList.find('h2').length).toBe(1);
        pagedList.setProps({ pageHeader: <h1>This is my custom PageHeader.</h1> });
        expect(pagedList.find('h1').length).toBe(1);
        expect(pagedList.find('h2').length).toBe(0);
    });
    var customPagedListFilter = (<PagedListFilter_1.PagedListFilters resource="test">
            <strong>Custom Filter</strong>
        </PagedListFilter_1.PagedListFilters>);
    var CustomPagedListFilter = (function (_super) {
        __extends(CustomPagedListFilter, _super);
        function CustomPagedListFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CustomPagedListFilter.prototype.render = function () {
            return (<h6>{this.props.resource}</h6>);
        };
        return CustomPagedListFilter;
    }(React.Component));
    var customDataGrid = (<DataGrid_1.DataGrid properties={null} instanceList={null} isBordered={true}>
            <b>Custom DataGrid</b>
        </DataGrid_1.DataGrid>);
    var CustomDataGrid = (function (_super) {
        __extends(CustomDataGrid, _super);
        function CustomDataGrid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CustomDataGrid.prototype.render = function () {
            return (<h1>Custom DataGrid</h1>);
        };
        return CustomDataGrid;
    }(React.Component));
    var userActionsMap = [
        { label: 'Add User', action: function () { } },
        { label: 'Delete User', action: function () { } },
    ];
    unroll('should render #componentName when passed as prop', function (done, args) {
        expect(pagedList.find(args.searchComponent).length).toBe(0);
        pagedList.setProps((_a = {}, _a[args.prop] = args.propValue, _a));
        expect(pagedList.find(args.searchComponent).length).toBe(1);
        done();
        var _a;
    }, [
        ['componentName', 'prop', 'propValue', 'searchComponent'],
        ['customPagedListFilter', 'pagedListFilters', customPagedListFilter, 'strong'],
        ['CustomPagedListFilter', 'pagedListFilters', CustomPagedListFilter, CustomPagedListFilter],
        ['UserActions', 'userActionsMap', userActionsMap, BulkUserActions_1.UserActions],
        ['customDataGrid', 'dataGrid', customDataGrid, 'b'],
        ['CustomDataGrid', 'dataGrid', CustomDataGrid, CustomDataGrid],
    ]);
    unroll('should call #methodName when page changes', function (done, args) {
        TestModel_1.TestModel.list.mockReset();
        modelActions_1.setPage = jest.fn();
        expect(TestModel_1.TestModel.list).not.toBeCalled();
        expect(modelActions_1.setPage).not.toBeCalled();
        pagedList.setProps(args.props);
        pagedList.instance()["handlePagination"](args.methodParam);
        expect(args.method).toBeCalled();
        done();
    }, [
        ['methodName', 'method', 'props', 'methodParam'],
        ['resetCheckboxState', checkboxActions_1.resetCheckboxState, { resetCheckboxState: checkboxActions_1.resetCheckboxState }, null],
        ['setPage', modelActions_1.setPage, { activePage: 1, setPage: modelActions_1.setPage }, 1],
    ]);
    it('should calculate offset when page changes', function () {
        pagedList.setProps({ pageNumber: 2, max: 10 });
        pagedList.instance()["handlePagination"](2);
        expect(pagedList.instance().offset).toEqual(10);
    });
});
describe('Test cases for paged-list using mount', function () {
    var storeInstances = {};
    storeInstances["testList"] = {
        instanceList: [TestModel_1.userModelBruceInstance],
        totalCount: 1,
        activePage: 1,
        properties: TestModel_1.userModelBruceInstance.properties,
    };
    var checkbox = { selectedIds: [1], selectAllOnPage: false, selectAll: false };
    var pagedList = enzyme_1.mount(<react_redux_1.Provider store={store_1.configureStore({ data: immutable_1.fromJS(storeInstances), checkbox: checkbox })}>
            <PagedList_1.PagedList max={10} resource="test">
                <h1>
                    My PagedListFilter test using mount.
                </h1>
            </PagedList_1.PagedList>
        </react_redux_1.Provider>);
    it('should unmount paged-list when unmount is called', function () {
        expect(pagedList.find('h2').length).toBe(1);
        pagedList.unmount();
        expect(pagedList.find('h2').length).toBe(0);
    });
});
