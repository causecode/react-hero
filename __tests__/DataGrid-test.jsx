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
jest.unmock('../src/components/paged-list/DataGrid');
jest.mock('../src/utils/appService');
var React = require("react");
var AppService = require("../src/utils/appService");
var enzyme_1 = require("enzyme");
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var react_bootstrap_1 = require("react-bootstrap");
var store_1 = require("../src/store");
var UserModel_1 = require("./testData/UserModel");
var checkboxActions_1 = require("../src/actions/checkboxActions");
var TestModel_1 = require("./testData/TestModel");
var DataGrid_1 = require("../src/components/paged-list/DataGrid");
require("../src/init");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for DataGrid', function () {
    var testFunction = jest.fn();
    var instanceList = [TestModel_1.userModelBruceInstance];
    var totalCount = 1;
    var checkboxReducer = { selectedIds: [1], selectAllOnPage: false, selectAll: false };
    var selectAllRecords = jest.fn();
    var selectAllRecordsOnPage = jest.fn();
    var setChecked = jest.fn();
    var setUnchecked = jest.fn();
    var dataGrid = enzyme_1.shallow(<DataGrid_1.DataGridImpl totalCount={20} max={10} offset={0} instanceList={[TestModel_1.userModelBruceInstance]} properties={TestModel_1.userModelBruceInstance.properties} setChecked={setChecked} showDefaultActions={true} setUnchecked={setUnchecked} selectAllRecords={selectAllRecords} selectAllRecordsOnPage={selectAllRecordsOnPage} handleRecordDelete={testFunction}/>);
    unroll('should render #count #component elements', function (done, args) {
        expect(dataGrid.find(args.selector).length).toBe(args.count);
        done();
    }, [
        ['component', 'selector', 'count'],
        ['Link', react_router_1.Link, 2],
        ['Table', react_bootstrap_1.Table, 1],
        ['checkbox', 'input[type="checkbox"]', 2],
        ['totalCount', '#totalCount', 1],
    ]);
    unroll('should call handleChange when checkbox is checked or unchecked', function (done, args) {
        args.checkbox.simulate('change', { target: { checked: true } });
        expect(args.method).toBeCalled();
        args.checkbox.simulate('change', { target: { checked: false } });
        expect(selectAllRecordsOnPage).toBeCalled();
        done();
    }, [
        ['checkbox', 'method'],
        [dataGrid.find('input[type="checkbox"]').at(0), selectAllRecordsOnPage],
        [dataGrid.find('input[type="checkbox"]').at(1), setChecked],
    ]);
    it('should delete the data when delete icon is clicked.', function () {
        dataGrid.find('a').simulate('click');
        expect(testFunction).toBeCalled();
    });
    unroll('should not render DataGrid content when instanceList is #status.', function (done, args) {
        dataGrid.setProps({ instanceList: args.propValue });
        expect(dataGrid.find('Table').length).toBe(0);
        done();
    }, [
        ['status', 'propValue'],
        ['null', null],
        ['empty', []],
    ]);
    describe('When getHTML method is defined for any property inside model', function () {
        var checkbox = { selectedIds: [1], selectAll: false, selectAllOnPage: false };
        AppService.getInnerData = jest.fn();
        selectAllRecords = jest.fn(function () {
            return {
                type: 'DUMMY',
                payload: 1,
            };
        });
        checkboxActions_1.toggleCheckbox = jest.fn(function () {
            return {
                type: 'DUMMY',
                payload: false,
            };
        });
        store_1.store.dispatch = jest.fn();
        var userDataGrid = enzyme_1.mount(<react_redux_1.Provider store={store_1.configureStore({ checkbox: checkbox })}>
                    <DataGrid_1.DataGrid instanceList={[UserModel_1.userModelStephenInstance]} properties={UserModel_1.userModelStephenInstance.properties}/>
                </react_redux_1.Provider>);
        it('should render property as HTML element when method is defined inside model for that property', function () {
            expect(userDataGrid.find('Link').length).toBe(4);
            var renderedAsLink = false;
            userDataGrid.find('Link').forEach(function (link) {
                if (link.props()["to"] === '/stephen' || link.props()["to"] === '/queensConsolidated') {
                    renderedAsLink = true;
                }
            });
            expect(renderedAsLink).toBeTruthy();
        });
    });
    describe('Tests for different actions.', function () {
        var TestActionComponent = (function (_super) {
            __extends(TestActionComponent, _super);
            function TestActionComponent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TestActionComponent.prototype.render = function () {
                return (<button id="testActionComponent">testAction</button>);
            };
            return TestActionComponent;
        }(React.Component));
        var testActionElement = function (instance) {
            return <button id="customAction">custom action</button>;
        };
        /**
         * Using different component tree for each test suite because once the component is mounted,
         * even after changing the props(using setProps), the tree failed to update.
         * Tried using componentTree.update() and beforeEach() as well.
         */
        describe('When showDefaultActions is false and custom actions are not present', function () {
            var componentTree = enzyme_1.mount(<react_redux_1.Provider store={store_1.configureStore({ checkbox: checkboxReducer })}>
                        <DataGrid_1.DataGrid instanceList={instanceList} totalCount={totalCount} properties={TestModel_1.userModelBruceInstance.properties} showDefaultActions={false}/>
                    </react_redux_1.Provider>);
            it('should not render actions.', function () {
                expect(componentTree.find(react_router_1.Link).length).toEqual(0);
            });
        });
        describe('When custom action prop is passed.', function () {
            unroll('should render the custom action #title.', function (done, args) {
                var componentTree = enzyme_1.mount(<react_redux_1.Provider store={store_1.configureStore({ checkbox: checkboxReducer })}>
                            <DataGrid_1.DataGrid instanceList={instanceList} totalCount={totalCount} properties={TestModel_1.userModelBruceInstance.properties} customActions={args.propValue}/>
                        </react_redux_1.Provider>);
                expect(componentTree.find("#" + args.buttonId).length).toEqual(1);
                done();
            }, [
                ['title', 'propValue', 'buttonId'],
                ['element', testActionElement, 'customAction'],
                ['component', TestActionComponent, 'testActionComponent'],
            ]);
        });
        describe('When custom action is not passed as a prop and custom action component is present.', function () {
            AppService.getActionComponent = jest.fn(function () {
                return TestActionComponent;
            });
            var componentTree = enzyme_1.mount(<react_redux_1.Provider store={store_1.configureStore({ checkbox: checkboxReducer })}>
                        <DataGrid_1.DataGrid instanceList={instanceList} totalCount={totalCount} properties={TestModel_1.userModelBruceInstance.properties}/>
                    </react_redux_1.Provider>);
            it('should render the custom action component by dynamic lookup.', function () {
                expect(componentTree.find('#testActionComponent').length).toEqual(1);
                expect(AppService.getActionComponent).toBeCalled();
            });
        });
    });
});
