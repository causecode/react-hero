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
var react_redux_1 = require("react-redux");
var commonUtils_1 = require("../../utils/commonUtils");
var ReusableComponents_1 = require("../ReusableComponents");
var AlertDismissableImpl = (function (_super) {
    __extends(AlertDismissableImpl, _super);
    function AlertDismissableImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlertDismissableImpl.prototype.render = function () {
        if (!this.props.show) {
            return null;
        }
        return (React.createElement(ReusableComponents_1.Alert, { style: this.props.alertStyle || alertStyle, bsStyle: this.props.type, onDismiss: commonUtils_1.hideAlert },
            React.createElement("strong", null,
                React.createElement("span", { style: this.props.alertFontStyle || fontStyle }, this.props.message))));
    };
    return AlertDismissableImpl;
}(React.Component));
AlertDismissableImpl = __decorate([
    Radium
], AlertDismissableImpl);
exports.AlertDismissableImpl = AlertDismissableImpl;
var mapStateToProps = function (state) {
    return {
        show: state.alertDismissable.show,
        type: state.alertDismissable.type,
        message: state.alertDismissable.message
    };
};
var AlertDismissable = react_redux_1.connect(mapStateToProps)(AlertDismissableImpl);
exports.AlertDismissable = AlertDismissable;
var alertStyle = {
    position: 'fixed',
    height: 'auto',
    textAlign: 'center',
    width: '100%',
    verticalAlign: 'middle',
    zIndex: 887,
    marginTop: '-20px'
};
var fontStyle = {
    fontSize: '16px',
    fontWeight: 'bold'
};
//# sourceMappingURL=AlertDismissable.js.map