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
var ReusableComponents_1 = require("../ReusableComponents");
var ConfirmationModalImpl = (function (_super) {
    __extends(ConfirmationModalImpl, _super);
    function ConfirmationModalImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfirmationModalImpl.prototype.render = function () {
        return (React.createElement(ReusableComponents_1.Modal, { dialogClassName: "modalDialog", show: this.props.show, onHide: this.props.onHide },
            React.createElement(ReusableComponents_1.Modal.Body, null,
                React.createElement(ReusableComponents_1.Row, { style: rowStyle },
                    React.createElement(ReusableComponents_1.Col, { sm: 2 },
                        React.createElement(ReusableComponents_1.FontAwesome, { name: "question-circle", size: "3x" })),
                    React.createElement(ReusableComponents_1.Col, { sm: 10 },
                        React.createElement("strong", { style: fontStyle }, this.props.modalBody)))),
            React.createElement(ReusableComponents_1.Modal.Footer, { style: footerStyle },
                React.createElement(ReusableComponents_1.Button, { bsStyle: "primary", onClick: this.props.onConfirm }, "Confirm"),
                React.createElement(ReusableComponents_1.Button, { onClick: this.props.onHide }, "Cancel"))));
    };
    ConfirmationModalImpl = __decorate([
        Radium
    ], ConfirmationModalImpl);
    return ConfirmationModalImpl;
}(React.Component));
exports.ConfirmationModalImpl = ConfirmationModalImpl;
var mapStateToProps = function (state) {
    return {
        show: state.confirmationModal,
    };
};
var ConfirmationModal = react_redux_1.connect(mapStateToProps)(ConfirmationModalImpl);
exports.ConfirmationModal = ConfirmationModal;
var fontStyle = {
    fontSize: '16px',
    lineHeight: '22.5px',
    wordBreak: 'break-all',
};
var rowStyle = {
    padding: '15px 5px',
};
var footerStyle = {
    padding: '20px',
};
//# sourceMappingURL=ConfirmationModal.js.map