"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
        var _this = _super.apply(this, arguments) || this;
        _this.fetchInstanceFromServer = function () {
            var _a = _this.props.params, resource = _a.resource, resourceID = _a.resourceID;
            if (resourceID) {
                modelService_1.ModelService.getModel(resource).get(resourceID, false, {}, function () { }, function () { }, store_1.store.getState(), 'edit');
            }
        };
        _this.handleSubmit = function (instance) {
            if (_this.isCreatePage()) {
                instance.$save(true);
            }
            else {
                instance.$update(true);
            }
        };
        _this.handleDelete = function () {
            _this.props.instance.$delete(true);
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
            var ModelClass = modelService_1.ModelService.getModel(instance.resourceName);
            instance = new ModelClass(instance.properties);
        }
        if (!(instance instanceof BaseModel_1.BaseModel)) {
            return (React.createElement(ErrorPage_1.ErrorPage, { message: constants_1.INSTANCE_NOT_FOUND }));
        }
        var childProps = { location: this.props.location, params: this.props.params,
            handleSubmit: this.handleSubmit, instance: instance, handleDelete: this.handleDelete,
            isCreatePage: this.isCreatePage() };
        var Page = componentService_1.ComponentService
            .getFormPage(this.props.params.resource, this.isCreatePage());
        return (React.createElement(Page, __assign({}, childProps)));
    };
    return EditPageImpl;
}(React.Component));
exports.EditPageImpl = EditPageImpl;
EditPageImpl.defaultProps = {
    instance: new BaseModel_1.DefaultModel({}),
    params: { resource: '', resourceID: '' },
    location: { pathname: '' },
};
function mapStateToProps(state, ownProps) {
    var isCreate = isCreatePage(ownProps.location.pathname);
    var ModelClass = modelService_1.ModelService.getModel(ownProps.params.resource);
    var instance;
    if (!isCreate) {
        instance = ModelClass.get(ownProps.params.resourceID, true, {}, function () { }, function () { }, state, '');
    }
    else {
        instance = new ModelClass({});
    }
    return {
        instance: instance
    };
}
var EditPage = react_redux_1.connect(mapStateToProps)(EditPageImpl);
exports.EditPage = EditPage;
//# sourceMappingURL=EditPage.js.map