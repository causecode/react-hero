"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_redux_1 = require("react-redux");
var actions = require('react-redux-form').actions;
;
var RawContentWrapperImpl = (function (_super) {
    __extends(RawContentWrapperImpl, _super);
    function RawContentWrapperImpl() {
        var _this = _super.apply(this, arguments) || this;
        _this.handleChange = function (event) {
            _this.props.saveData(_this.props.model, event.target["value"]);
        };
        return _this;
    }
    RawContentWrapperImpl.prototype.render = function () {
        return (React.createElement("div", { style: this.props.style ? this.props.style : container },
            React.createElement("textarea", { className: "form-control", defaultValue: this.props.value, onChange: this.handleChange, style: rawContentTextArea })));
    };
    return RawContentWrapperImpl;
}(React.Component));
exports.RawContentWrapperImpl = RawContentWrapperImpl;
var mapStateToProps = function (state, ownProps) {
    var data = state.forms || {};
    ownProps.model.split('.').forEach(function (prop) {
        data = data.hasOwnProperty(prop) ? data[prop] : '';
    });
    return {
        value: data,
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