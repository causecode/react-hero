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
var appService_1 = require("../../../utils/appService");
var ReusableComponents_1 = require("../../ReusableComponents");
var commonUtils_1 = require("../../../utils/commonUtils");
var GenericInputTemplate_1 = require("./GenericInputTemplate");
var BooleanInputTemplate_1 = require("./BooleanInputTemplate");
var DropDownInputTemplate_1 = require("./DropDownInputTemplate");
var DateTimeComponent_1 = require("./DateTimeComponent");
var ListInputTemplate_1 = require("./ListInputTemplate");
var actions = require('react-redux-form').actions;
var FormInputImpl = (function (_super) {
    __extends(FormInputImpl, _super);
    function FormInputImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (newValue) {
            _this.props.change(_this.props.model, newValue);
        };
        _this.getInputTemplate = function () {
            var type = _this.props.type;
            switch (type) {
                case 'boolean': return BooleanInputTemplate_1.BooleanInputTemplate;
                case 'select': return DropDownInputTemplate_1.DropDownInputTemplate;
                case 'list': return ListInputTemplate_1.ListInputTemplate;
                case 'datetime': return DateTimeComponent_1.DateTimeComponent;
                default: return GenericInputTemplate_1.GenericInputTemplate;
            }
        };
        return _this;
    }
    FormInputImpl.prototype.render = function () {
        var propertyValue = this.props.propertyValue;
        if (this.props.type === 'date') {
            propertyValue = propertyValue ? appService_1.parseWidgetDate(propertyValue) : '';
        }
        var InputTemplate = this.getInputTemplate();
        return (React.createElement(ReusableComponents_1.FormGroup, { className: "row", style: { margin: '0px' } },
            React.createElement(ReusableComponents_1.Col, { sm: this.props.labelSize },
                React.createElement(ReusableComponents_1.ControlLabel, { style: __assign({ defaultLabelStyle: defaultLabelStyle }, this.props.style.labelCSS) }, this.props.propertyName)),
            React.createElement(ReusableComponents_1.Col, { sm: this.props.fieldSize },
                React.createElement(InputTemplate, __assign({}, this.props, { value: propertyValue, onChange: this.handleChange })))));
    };
    FormInputImpl.defaultProps = {
        fieldSize: 9,
        labelSize: 3,
        model: '',
        enum: '',
        type: '',
        propertyName: '',
        style: { inputCSS: {}, labelCSS: {}, listCSS: {}, btnCSS: {} },
    };
    return FormInputImpl;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    var data = state.forms || {};
    return {
        propertyValue: commonUtils_1.getNestedData(data, ownProps.model || ''),
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        change: function (model, value) {
            dispatch(actions.change(model, value));
        },
    };
};
exports.FormInput = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormInputImpl);
var defaultLabelStyle = {
    textAlign: 'right',
};
//# sourceMappingURL=index.js.map