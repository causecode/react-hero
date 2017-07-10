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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Radium = require("radium");
var modelService_1 = require("../../../utils/modelService");
var react_bootstrap_1 = require("react-bootstrap");
var react_redux_1 = require("react-redux");
var ReduxForm = require('redux-form');
var classNames = require('classnames');
var InnerFilterFormImpl = (function (_super) {
    __extends(InnerFilterFormImpl, _super);
    function InnerFilterFormImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubmit = function (event) {
            event.preventDefault();
            _this.sendFilters(_this.props.resource);
        };
        return _this;
    }
    InnerFilterFormImpl.prototype.sendFilters = function (resource) {
        modelService_1.ModelService.getModel(resource).list({}, false, {}, this.props.successCallBack, this.props.failureCallBack, this.props.path);
    };
    InnerFilterFormImpl.prototype.render = function () {
        var hideClass = this.props.filtersOpen ? '' : 'hide';
        return (React.createElement("form", { className: classNames('form-inline', 'filter-form', 'stick-left', hideClass), onSubmit: this.handleSubmit },
            this.props.children,
            React.createElement(react_bootstrap_1.Button, { className: "filter-button", bsStyle: "primary", type: "submit" }, "Submit")));
    };
    return InnerFilterFormImpl;
}(React.Component));
InnerFilterFormImpl.defaultProps = {
    filtersOpen: false,
};
InnerFilterFormImpl = __decorate([
    Radium
], InnerFilterFormImpl);
exports.InnerFilterFormImpl = InnerFilterFormImpl;
function mapStateToProps(state) {
    return {
        filtersOpen: state.data.get('filtersOpen')
    };
}
function createFilterForm(resource) {
    var InnerFilterFormConnected = ReduxForm.reduxForm({
        form: resource + "Filters",
    })(InnerFilterFormImpl);
    var InnerFilterForm = react_redux_1.connect(mapStateToProps)(InnerFilterFormConnected);
    return InnerFilterForm;
}
exports.createFilterForm = createFilterForm;
//# sourceMappingURL=DynamicForm.js.map