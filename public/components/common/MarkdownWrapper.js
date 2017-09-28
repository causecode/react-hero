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
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;
var MarkDownPreview = require('react-markdown');
;
var MarkdownWrapperImpl = (function (_super) {
    __extends(MarkdownWrapperImpl, _super);
    function MarkdownWrapperImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (value) {
            _this.props.saveData(_this.props.model, value);
        };
        return _this;
    }
    MarkdownWrapperImpl.prototype.render = function () {
        return (React.createElement("div", { style: this.props.style || null },
            React.createElement(Radium.Style, { scopeSelector: "div", rules: {
                    '.md-editor-tabs-item:nth-child(2n)': {
                        display: 'none !important',
                    },
                } }),
            React.createElement(MarkdownEditor, { className: "markDownEditor", initialContent: this.props.value, iconsSet: "font-awesome", onContentChange: this.handleChange }),
            React.createElement("div", { style: topMargin },
                React.createElement("strong", { style: labelStyle }, "Output"),
                React.createElement("div", { style: this.props.value ? previewStyle : { display: 'none' } },
                    React.createElement(MarkDownPreview, { source: this.props.value })))));
    };
    return MarkdownWrapperImpl;
}(React.Component));
MarkdownWrapperImpl = __decorate([
    Radium
], MarkdownWrapperImpl);
exports.MarkdownWrapperImpl = MarkdownWrapperImpl;
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
exports.MarkdownWrapper = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MarkdownWrapperImpl);
var topMargin = {
    margin: '20px 0px 0px 0px',
};
var labelStyle = {
    margin: '0px 0px 0px -80px',
};
var previewStyle = {
    overflow: 'scroll',
    padding: '20px',
    border: '2px solid black',
    margin: '30px 0px 0px',
    height: '200px',
};
//# sourceMappingURL=MarkdownWrapper.js.map