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
var BaseModel_1 = require("../models/BaseModel");
var componentService_1 = require("../utils/componentService");
var modelService_1 = require("../utils/modelService");
var constants_1 = require("../constants");
var ErrorPage_1 = require("../components/ErrorPage");
var react_redux_1 = require("react-redux");
var appService_1 = require("../utils/appService");
var store_1 = require("../store");
require("../init");
function isCreatePage(pathName) {
    if (!pathName) {
        return false;
    }
    return pathName.toLowerCase().indexOf('create') > -1;
}
var EditPageImpl = (function (_super) {
    __extends(EditPageImpl, _super);
    function EditPageImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fetchInstanceFromServer = function () {
            var _a = _this.props.match.params, resource = _a.resource, resourceID = _a.resourceID;
            if (resourceID) {
                modelService_1.ModelService.getModel(resource).get(resourceID, false, {}, function () { }, function () { }, store_1.store.getState(), 'edit');
            }
        };
        _this.handleSubmit = function (instance, successCallBack, failureCallBack) {
            if (_this.isCreatePage()) {
                instance.$save(true, {}, successCallBack, failureCallBack);
            }
            else {
                instance.$update(true, {}, successCallBack, failureCallBack);
            }
        };
        _this.handleDelete = function (instance, successCallBack, failureCallBack) {
            instance.$delete(true, {}, successCallBack, failureCallBack);
        };
        return _this;
    }
    EditPageImpl.prototype.isCreatePage = function () {
        return isCreatePage(this.props.location.pathname);
    };
    EditPageImpl.prototype.componentWillMount = function () {
        if (!this.isCreatePage()) {
            this.fetchInstanceFromServer();
        }
        appService_1.initializeFormWithInstance(this.props.instance, this.isCreatePage());
    };
    EditPageImpl.prototype.componentWillReceiveProps = function (nextProps) {
        var currentInstance = this.props.instance;
        var nextInstance = nextProps.instance;
        if (!appService_1.objectEquals(nextInstance, currentInstance)) {
            appService_1.initializeFormWithInstance(nextProps.instance, this.isCreatePage());
        }
    };
    EditPageImpl.prototype.render = function () {
        var instance = this.props.instance;
        if (!appService_1.isEmpty(instance) && !appService_1.isEmpty(instance.properties) && instance.resourceName) {
            /*
             * React-redux-form does not save class instances in the store. Hence Recreating the instance
             * here in case the instance was coming from the React-redux-form store.
             */
            var ModelClass = modelService_1.ModelService.getModel(instance.resourceName);
            instance = new ModelClass(instance.properties);
        }
        if (!(instance instanceof BaseModel_1.BaseModel)) {
            return (<ErrorPage_1.ErrorPage message={constants_1.INSTANCE_NOT_FOUND}/>);
        }
        var childProps = { location: this.props.location, params: this.props.match.params,
            handleSubmit: this.handleSubmit, instance: instance, handleDelete: this.handleDelete,
            isCreatePage: this.isCreatePage() };
        var Page = componentService_1.ComponentService
            .getFormPage(this.props.match.params.resource, this.isCreatePage());
        return (<Page {...childProps}/>);
    };
    return EditPageImpl;
}(React.Component));
EditPageImpl.defaultProps = {
    instance: new BaseModel_1.DefaultModel({}),
};
exports.EditPageImpl = EditPageImpl;
function mapStateToProps(state, ownProps) {
    var location = ownProps.location, match = ownProps.match;
    var isCreate = isCreatePage(location.pathname);
    if (!match.params.resource && location.pathname) {
        var ownPropsParams = appService_1.getResourceParams(location.pathname);
        match.params.resource = ownPropsParams.resource;
        match.params.resourceID = ownPropsParams.resourceID;
    }
    var ModelClass = modelService_1.ModelService.getModel(ownProps.match.params.resource);
    var instance;
    if (!isCreate) {
        instance = ModelClass.get(match.params.resourceID, true, {}, function () { }, function () { }, state, '');
    }
    else {
        instance = new ModelClass({});
    }
    return {
        instance: instance,
    };
}
var EditPage = react_redux_1.connect(mapStateToProps)(EditPageImpl);
exports.EditPage = EditPage;
