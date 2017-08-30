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
jest.unmock('../src/components-stateful/EditPage');
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var EditPage_1 = require("../src/components-stateful/EditPage");
var BaseModel_1 = require("../src/models/BaseModel");
var initializeTestCase_1 = require("./../src/utils/initializeTestCase");
var constants_1 = require("../src/constants");
var componentService_1 = require("../src/utils/componentService");
var GenericEditPage_1 = require("../src/components/CRUD/GenericEditPage");
var ModelPropTypes_1 = require("../src/models/ModelPropTypes");
var _1 = require("../src/store/");
var modelService_1 = require("../src/utils/modelService");
var ErrorPage_1 = require("../src/components/ErrorPage");
var react_redux_1 = require("react-redux");
var resolver_1 = require("../src/resolver");
var immutable_1 = require("immutable");
var ShallowTestUtils = require('react-shallow-testutils');
var unroll = require('unroll');
unroll.use(it);
function generalEditPageTests(renderedPage, instance, resource) {
    expect(renderedPage).toBeTruthy();
    expect(renderedPage.props.instance).toEqual(instance);
    expect(renderedPage.props.params.resource).toEqual(resource);
}
describe('Test EditPage', function () {
    var path = 'edit';
    var resourceID = '1';
    var _a = initializeTestCase_1.initializeTestCase(), resource = _a.resource, instances = _a.instances;
    var renderer;
    var createPath = 'create/page';
    var editPath = 'edit/page';
    beforeEach(function () {
        renderer = TestUtils.createRenderer();
        BaseModel_1.BaseModel.get = jest.fn();
    });
    it('renders a simple EditPage without a resourceID', function () {
        renderer.render(<EditPage_1.EditPageImpl params={{ resource: resource }} instance={instances[resource]} location={{ pathname: '' }}/>);
        var page = renderer.getRenderOutput();
        expect(page).toBeTruthy();
        var renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage_1.GenericEditPage);
        generalEditPageTests(renderedPage, instances[resource], resource);
        expect(BaseModel_1.BaseModel.get).not.toBeCalled();
    });
    it('renders the EditPage without any props', function () {
        renderer.render(<EditPage_1.EditPageImpl />);
        var page = renderer.getRenderOutput();
        expect(page).toBeTruthy();
        expect(page.props.location.pathname).toBe('');
        expect(page.props.params.resource).toBe('');
        expect(page.props.params.resourceID).toBe('');
        expect(page.props.instance).toEqual(new BaseModel_1.DefaultModel({}));
        var renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage_1.GenericEditPage);
        generalEditPageTests(renderedPage, new BaseModel_1.DefaultModel({}), '');
        expect(BaseModel_1.BaseModel.get).not.toBeCalled();
    });
    it('renders an EditPage with user implemented EditPage and Model registered', function () {
        var AbcEditPage = (function (_super) {
            __extends(AbcEditPage, _super);
            function AbcEditPage() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AbcEditPage.prototype.render = function () {
                return (<div></div>);
            };
            return AbcEditPage;
        }(React.Component));
        AbcEditPage.resourceName = 'abc';
        var AbcModel = (function (_super) {
            __extends(AbcModel, _super);
            function AbcModel(data) {
                return _super.call(this, data) || this;
            }
            return AbcModel;
        }(BaseModel_1.BaseModel));
        AbcModel.resourceName = 'abc';
        AbcModel.propTypes = {
            id: ModelPropTypes_1.ModelPropTypes.NUMBER()
        };
        AbcModel.defaultProps = {
            id: 0
        };
        modelService_1.ModelService.register(AbcModel);
        componentService_1.ComponentService.register(AbcEditPage, 'edit');
        expect(resolver_1.resolver.has('abcmodel')).toEqual(true);
        expect(resolver_1.resolver.get('abcmodel')).toEqual(AbcModel);
        expect(resolver_1.resolver.has('abcedit')).toEqual(true);
        expect(resolver_1.resolver.get('abcedit')).toEqual(AbcEditPage);
        renderer.render(<EditPage_1.EditPageImpl params={{ resource: 'abc', resourceID: resourceID }} instance={new AbcModel({})}/>);
        var page = renderer.getRenderOutput();
        expect(page).toBeTruthy();
        expect(page.props.params.resource).toEqual('abc');
        expect(page.props.params.resourceID).toEqual('1');
        expect(page.props.instance).toEqual(new AbcModel({}));
        var renderedPage = ShallowTestUtils.findWithType(page, AbcEditPage);
        generalEditPageTests(renderedPage, new AbcModel({}), 'abc');
        expect(AbcModel.get).toBeCalled();
    });
    it('renders the error page when BaseModel instance is not provided.', function () {
        var TestModel = (function () {
            function TestModel() {
            }
            return TestModel;
        }());
        renderer.render(<EditPage_1.EditPageImpl params={{ resource: resource }} instance={new TestModel()} location={{ pathname: '' }}/>);
        var page = renderer.getRenderOutput();
        expect(page.type).toEqual(ErrorPage_1.ErrorPage);
        expect(page.props.message).toEqual(constants_1.INSTANCE_NOT_FOUND);
    });
    describe('Test EditPage with the store', function () {
        var TestModel = (function (_super) {
            __extends(TestModel, _super);
            function TestModel(data) {
                return _super.call(this, data) || this;
            }
            return TestModel;
        }(BaseModel_1.BaseModel));
        TestModel.resourceName = 'test';
        TestModel.propTypes = {
            id: ModelPropTypes_1.ModelPropTypes.NUMBER()
        };
        TestModel.defaultProps = {
            id: 0
        };
        modelService_1.ModelService.register(TestModel);
        var renderedInstance = new TestModel({});
        renderedInstance.$save = jest.fn();
        renderedInstance.$update = jest.fn();
        renderedInstance.$delete = jest.fn();
        it('renders the EditPage with the store', function () {
            modelService_1.ModelService.getModel = jest.fn();
            BaseModel_1.BaseModel.get = jest.fn();
            var storeInstances = {};
            storeInstances['testEdit'] = renderedInstance;
            var page = TestUtils.renderIntoDocument(<react_redux_1.Provider store={_1.configureStore({ instances: immutable_1.fromJS(storeInstances) })}>
                    <EditPage_1.EditPage params={{ resource: resource, resourceID: resourceID }} location={{ pathname: 'edit' }}/>
                </react_redux_1.Provider>);
        });
    });
});
