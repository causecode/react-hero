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
var connect = require('react-redux').connect;
var modelService_1 = require("../utils/modelService");
var constants_1 = require("../constants");
var ErrorPage_1 = require("../components/ErrorPage");
var store_1 = require("../store");
var appService_1 = require("../utils/appService");
var ShowPageImpl = (function (_super) {
    __extends(ShowPageImpl, _super);
    function ShowPageImpl() {
        return _super.apply(this, arguments) || this;
    }
    ShowPageImpl.prototype.fetchInstanceData = function (resource, resourceID) {
        modelService_1.ModelService.getModel(resource).get(resourceID, false, {}, function () { }, function () { }, store_1.store.getState(), 'edit');
    };
    ShowPageImpl.prototype.componentWillMount = function () {
        var _a = this.props.params, resource = _a.resource, resourceID = _a.resourceID;
        this.fetchInstanceData(resource, resourceID);
    };
    ShowPageImpl.prototype.render = function () {
        if (!(this.props.instance instanceof BaseModel_1.BaseModel)) {
            return (React.createElement(ErrorPage_1.ErrorPage, { message: constants_1.PAGE_NOT_FOUND }));
        }
        var resource = this.props.params.resource;
        var childProps = { instance: this.props.instance, resource: resource };
        var Page = componentService_1.ComponentService.getShowPage(resource);
        return (React.createElement(Page, __assign({}, childProps)));
    };
    return ShowPageImpl;
}(React.Component));
exports.ShowPageImpl = ShowPageImpl;
ShowPageImpl.defaultProps = {
    instance: new BaseModel_1.DefaultModel({}),
    params: { resource: '', resourceID: '' }
};
function mapStateToProps(state, ownProps) {
    var params = ownProps.params;
    if (!params.resource && window.location.pathname) {
        var ownPropsParams = appService_1.getResourceParams(window.location.pathname);
        params.resource = ownPropsParams.resource;
        params.resourceID = ownPropsParams.resourceID;
    }
    var instance = modelService_1.ModelService.getModel(ownProps.params.resource)
        .get(ownProps.params.resourceID, true, {}, function () { }, function () { }, state, 'edit');
    return {
        instance: instance,
    };
}
var ShowPage = connect(mapStateToProps)(ShowPageImpl);
exports.ShowPage = ShowPage;
//# sourceMappingURL=ShowPage.js.map