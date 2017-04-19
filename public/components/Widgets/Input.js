"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var moment = require("moment");
var react_redux_1 = require("react-redux");
var appService_1 = require("../../utils/appService");
var react_bootstrap_1 = require("react-bootstrap");
var actions = require('react-redux-form').actions;
var ReactDatetime = require('react-datetime');
var GenericInputTemplate = function (props) {
    var handleChange = function (e) {
        props.onChange(e.target["value"]);
    };
    return (React.createElement("input", { type: props.type, className: "form-control", value: props.propertyValue, onChange: handleChange }));
};
var BooleanInputTemplate = function (props) {
    var handleChange = function (e) {
        props.onChange((e.target["value"] === 'option-true'));
    };
    return (React.createElement(react_bootstrap_1.Row, null,
        React.createElement(react_bootstrap_1.Col, { sm: 6 },
            React.createElement(react_bootstrap_1.Radio, { onChange: handleChange, value: "option-true", name: props.propertyName, checked: props.propertyValue }, "True")),
        React.createElement(react_bootstrap_1.Col, { sm: 6 },
            React.createElement(react_bootstrap_1.Radio, { onChange: handleChange, value: "option-false", name: props.propertyName, checked: !props.propertyValue }, "False"))));
};
var DropDownInputTemplate = function (props) {
    var handleChange = function (e) {
        props.onChange(e.target["value"]);
    };
    return (React.createElement("select", { value: props.propertyValue, className: "form-control", onChange: handleChange },
        React.createElement("option", { value: "", style: {
                color: 'grey',
                pointerEvents: 'none'
            } }, "Select One"),
        (function () {
            var enumInstance = props.enum;
            if (appService_1.isEmpty(enumInstance)) {
                return;
            }
            var optionElements = [];
            enumInstance.forEach(function (element, index) {
                optionElements.push(React.createElement("option", { key: index, value: element.value }, element.label));
            });
            return optionElements;
        })()));
};
var ListInputTemplate = (function (_super) {
    __extends(ListInputTemplate, _super);
    function ListInputTemplate(props) {
        var _this = _super.call(this, props) || this;
        _this.handleTextChange = function (e) {
            _this.setState({ newListItem: e.target["value"] });
        };
        _this.addListItem = function (e) {
            _this.setState({ newListItem: '' });
            var propertyValue = _this.props.propertyValue ? _this.props.propertyValue.slice() : [];
            propertyValue.push(_this.state.newListItem);
            _this.props.onChange(propertyValue);
        };
        _this.state = { newListItem: '' };
        return _this;
    }
    ListInputTemplate.prototype.render = function () {
        var _this = this;
        var list = this.props.propertyValue || ['Nothing to show.'];
        return (React.createElement("div", null,
            React.createElement(react_bootstrap_1.Row, null,
                React.createElement(react_bootstrap_1.Col, { sm: 8 },
                    React.createElement(react_bootstrap_1.FormControl, { type: "text", value: this.state.newListItem, onChange: this.handleTextChange })),
                React.createElement(react_bootstrap_1.Col, { sm: 4 },
                    React.createElement(react_bootstrap_1.Button, { bsStyle: "default", onClick: this.addListItem }, "Add"))),
            React.createElement(react_bootstrap_1.ListGroup, { style: { margin: '10px' } }, (function () {
                return list.map(function (listItem, index) {
                    return (React.createElement(react_bootstrap_1.ListGroupItem, { style: { wordWrap: 'break-word' }, key: _this.props.propertyName + "-" + index }, listItem));
                });
            })())));
    };
    return ListInputTemplate;
}(React.Component));
var DateTimeComponent = (function (_super) {
    __extends(DateTimeComponent, _super);
    function DateTimeComponent() {
        var _this = _super.apply(this, arguments) || this;
        _this.handleChange = function (newValue) {
            if (newValue && newValue._d) {
                _this.props.change(_this.props.model, newValue._d.toISOString());
            }
        };
        return _this;
    }
    DateTimeComponent.prototype.render = function () {
        return (React.createElement(ReactDatetime, { defaultValue: this.props.propertyValue ?
                moment(this.props.propertyValue).format('MM-DD-YYYY HH:mm') : '', strictParsing: true, utc: true, onChange: this.handleChange }));
    };
    return DateTimeComponent;
}(React.Component));
var FormInputImpl = (function (_super) {
    __extends(FormInputImpl, _super);
    function FormInputImpl() {
        var _this = _super.apply(this, arguments) || this;
        _this.handleChange = function (newValue) {
            _this.props.change(_this.props.model, newValue);
        };
        _this.getInputTemplate = function () {
            var type = _this.props.type;
            switch (type) {
                case 'boolean': return BooleanInputTemplate;
                case 'select': return DropDownInputTemplate;
                case 'list': return ListInputTemplate;
                case 'datetime': return DateTimeComponent;
                default: return GenericInputTemplate;
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
        return (React.createElement(react_bootstrap_1.FormGroup, { className: "row", style: { margin: '0px' } },
            React.createElement(react_bootstrap_1.Col, { sm: 3 },
                React.createElement(react_bootstrap_1.ControlLabel, { style: { textAlign: 'right' } }, this.props.propertyName)),
            React.createElement(react_bootstrap_1.Col, { sm: 4 },
                React.createElement(InputTemplate, __assign({}, this.props, { value: propertyValue, onChange: this.handleChange })))));
    };
    return FormInputImpl;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    var data = state.forms || {};
    ownProps.model.split('.').forEach(function (prop) {
        data = data.hasOwnProperty(prop) ? data[prop] : '';
    });
    return {
        propertyValue: data
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        change: function (model, value) {
            dispatch(actions.change(model, value));
        }
    };
};
exports.FormInput = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormInputImpl);
//# sourceMappingURL=Input.js.map