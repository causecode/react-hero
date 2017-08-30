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
var BaseModel_1 = require("../../models/BaseModel");
var appService_1 = require("../../utils/appService");
var store_1 = require("../../store");
var Form = require('react-redux-form').Form;
var GenericEditPage = (function (_super) {
    __extends(GenericEditPage, _super);
    function GenericEditPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fetchStoreInstance = function () {
            var instance = _this.props.instance;
            var instanceKey = _this.props.isCreatePage ? instance.resourceName + "Create" : instance.resourceName + "Edit";
            instance.properties = store_1.store.getState().forms["rhForms"][instanceKey].properties;
            return instance;
        };
        _this.handleSubmit = function () {
            // Not using connect here to avoid rerendering of component on change of instance properties.
            _this.props.handleSubmit(_this.fetchStoreInstance(), function () { }, function () { });
        };
        _this.handleDelete = function () {
            if (_this.props.handleDelete && _this.props.handleDelete instanceof Function) {
                _this.props.handleDelete(_this.fetchStoreInstance(), function () { }, function () { });
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
            return (<div></div>);
        }
        return (<Form className="data-edit-form" onSubmit={this.handleSubmit} model={appService_1.getModelString(instance.resourceName)}>
                <react_bootstrap_1.Grid>
                    {appService_1.generateForm(instance, this.props.isCreatePage)}
                    <react_bootstrap_1.FormGroup>
                        <react_bootstrap_1.Col sm={4} smOffset={3}>
                            <react_bootstrap_1.Button bsStyle="primary" type="submit">
                                {this.props.isCreatePage ? 'Create' : 'Update'}
                            </react_bootstrap_1.Button>
                                {(function () {
            if (!_this.props.isCreatePage) {
                return (<react_bootstrap_1.Button bsStyle="danger" onClick={_this.handleDelete}>
                                                Delete
                                            </react_bootstrap_1.Button>);
            }
        })()}
                            <react_router_dom_1.Link className="btn btn-default" to={"/" + this.getResource() + "/list"}>Cancel</react_router_dom_1.Link>
                        </react_bootstrap_1.Col>
                    </react_bootstrap_1.FormGroup>
                </react_bootstrap_1.Grid>
            </Form>);
    };
    return GenericEditPage;
}(React.Component));
GenericEditPage.defaultProps = {
    handleSubmit: function (instance) { },
    params: { resource: '' },
    instance: new BaseModel_1.DefaultModel({}),
    isCreatePage: false,
};
exports.GenericEditPage = GenericEditPage;
