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
var actions = require('react-redux-form').actions;
var TinyMCE = require('react-tinymce-input');
var TinyMCEWrapperImpl = (function (_super) {
    __extends(TinyMCEWrapperImpl, _super);
    function TinyMCEWrapperImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (value) {
            _this.props.saveData(_this.props.model, value);
        };
        return _this;
    }
    TinyMCEWrapperImpl.prototype.render = function () {
        return (React.createElement("div", { style: this.props.style || container },
            React.createElement(TinyMCE, { value: this.props.value, tinymceConfig: this.props.config || {
                    plugins: 'autolink link image lists print',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
                    height: '190px',
                }, onChange: this.handleChange })));
    };
    return TinyMCEWrapperImpl;
}(React.Component));
TinyMCEWrapperImpl = __decorate([
    Radium
], TinyMCEWrapperImpl);
exports.TinyMCEWrapperImpl = TinyMCEWrapperImpl;
var mapStateToProps = function (state, ownProps) {
    var data = state.forms || {};
    return {
        value: commonUtils_1.getNestedData(data, ownProps.model),
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        saveData: function (model, value) {
            dispatch(actions.change(model, value));
        },
    };
};
exports.TinyMCEWrapper = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TinyMCEWrapperImpl);
var container = {
    margin: '15px 0px',
    minHeight: '300px',
};
//# sourceMappingURL=TinyMCEWrapper.js.map