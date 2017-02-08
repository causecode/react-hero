"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_1 = require("react-router");
var BaseModel_1 = require("../../models/BaseModel");
var appService_1 = require("../../utils/appService");
var store_1 = require("../../store");
var Form = require('react-redux-form').Form;
var GenericEditPage = (function (_super) {
    __extends(GenericEditPage, _super);
    function GenericEditPage() {
        var _this = _super.apply(this, arguments) || this;
        _this.fetchStoreInstance = function () {
            var instance = _this.props.instance;
            var instanceKey = _this.props.isCreatePage ? instance.resourceName + "Create" : instance.resourceName + "Edit";
            instance.properties = store_1.store.getState().forms["rhForms"][instanceKey].properties;
            return instance;
        };
        _this.handleSubmit = function () {
            _this.props.handleSubmit(_this.fetchStoreInstance());
        };
        _this.handleDelete = function () {
            if (_this.props.handleDelete && _this.props.handleDelete instanceof Function) {
                _this.props.handleDelete(_this.fetchStoreInstance());
            }
        };
        return _this;
    }
    GenericEditPage.prototype.getResource = function () {
        return this.props.params.resource || this.props.instance.resourceName || '';
    };
    GenericEditPage.prototype.render = function () {
        var _this = this;
        var instance = this.props.instance;
        if (appService_1.isEmpty(instance) || appService_1.isEmpty(instance.properties)) {
            return (React.createElement("div", null));
        }
        return (React.createElement(Form, { className: "data-edit-form", onSubmit: this.handleSubmit, model: appService_1.getModelString(instance.resourceName) },
            React.createElement(react_bootstrap_1.Grid, null,
                appService_1.generateForm(instance, this.props.isCreatePage),
                React.createElement(react_bootstrap_1.FormGroup, null,
                    React.createElement(react_bootstrap_1.Col, { sm: 4, smOffset: 3 },
                        React.createElement(react_bootstrap_1.Button, { bsStyle: "primary", type: "submit" }, this.props.isCreatePage ? 'Create' : 'Update'),
                        (function () {
                            if (!_this.props.isCreatePage) {
                                return (React.createElement(react_bootstrap_1.Button, { bsStyle: "danger", onClick: _this.handleDelete }, "Delete"));
                            }
                        })(),
                        React.createElement(react_router_1.Link, { className: "btn btn-default", to: this.getResource() + "/list" }, "Cancel"))))));
    };
    return GenericEditPage;
}(React.Component));
exports.GenericEditPage = GenericEditPage;
GenericEditPage.defaultProps = {
    handleSubmit: function (instance) { },
    params: { resource: '' },
    instance: new BaseModel_1.DefaultModel({}),
    isCreatePage: false
};
//# sourceMappingURL=GenericEditPage.js.map