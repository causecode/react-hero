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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var commonUtils_1 = require("../../utils/commonUtils");
var actions = require('react-redux-form').actions;
;
var RawContentWrapperImpl = (function (_super) {
    __extends(RawContentWrapperImpl, _super);
    function RawContentWrapperImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (event) {
            _this.props.saveData(_this.props.model, event.target["value"]);
        };
        return _this;
    }
    RawContentWrapperImpl.prototype.render = function () {
        var eventHandlerProps = this.props.onBlur ? { onBlur: this.handleChange } : { onChange: this.handleChange };
        return (React.createElement("div", { style: this.props.style ? this.props.style : container },
            React.createElement("textarea", __assign({ className: "form-control", defaultValue: this.props.value, style: rawContentTextArea }, eventHandlerProps))));
    };
    return RawContentWrapperImpl;
}(React.Component));
exports.RawContentWrapperImpl = RawContentWrapperImpl;
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
exports.RawContentWrapper = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(RawContentWrapperImpl);
var rawContentTextArea = {
    height: '300px',
    zIndex: 'auto',
    position: 'relative',
    lineHeight: '1.35em',
    fontSize: '14px',
    transition: 'none',
    background: '#292929',
    fontFamily: 'monospace',
    padding: '10px',
    color: '#ddd',
};
var container = {
    minHeight: '300px',
};
//# sourceMappingURL=RawContentWrapper.js.map