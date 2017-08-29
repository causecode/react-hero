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
var ReusableComponents_1 = require("../../ReusableComponents");
var ReduxForm = require('redux-form');
var OuterFilterImpl = (function (_super) {
    __extends(OuterFilterImpl, _super);
    function OuterFilterImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubmit = function (event) {
            event.preventDefault();
            _this.sendFilters(_this.props.resource);
        };
        return _this;
    }
    OuterFilterImpl.prototype.sendFilters = function (resource) {
        modelService_1.ModelService.getModel(resource).list();
    };
    OuterFilterImpl.prototype.render = function () {
        return (<form onSubmit={this.handleSubmit} style={outerFilterStyle}>
                <ReusableComponents_1.Row style={{ margin: 0 }}>
                    <react_bootstrap_1.Col md={5}>
                        <ReusableComponents_1.InputGroup>
                            {this.props.children}
                            <ReusableComponents_1.InputGroup.Button>
                                <react_bootstrap_1.Button type="submit" style={this.props.style}>
                                    <ReusableComponents_1.FontAwesome name="search"/>
                                </react_bootstrap_1.Button>
                            </ReusableComponents_1.InputGroup.Button>
                        </ReusableComponents_1.InputGroup>
                    </react_bootstrap_1.Col>
                </ReusableComponents_1.Row>
            </form>);
    };
    return OuterFilterImpl;
}(React.Component));
OuterFilterImpl = __decorate([
    Radium
], OuterFilterImpl);
exports.OuterFilterImpl = OuterFilterImpl;
function createOuterFilterForm(formName) {
    var OuterFilterForm = ReduxForm.reduxForm({
        form: formName,
    })(OuterFilterImpl);
    return OuterFilterForm;
}
exports.createOuterFilterForm = createOuterFilterForm;
var outerFilterStyle = {
    margin: '0px 0px 0px -15px',
};
