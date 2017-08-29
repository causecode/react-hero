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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var moment = require("moment");
var react_redux_1 = require("react-redux");
var appService_1 = require("../../utils/appService");
var react_bootstrap_1 = require("react-bootstrap");
var commonUtils_1 = require("../../utils/commonUtils");
var actions = require('react-redux-form').actions;
var ReactDatetime = require('react-datetime');
var GenericInputTemplate = function (props) {
    var handleChange = function (e) {
        props.onChange(e.target["value"]);
    };
    var inputProps = props.onBlur ? { onBlur: handleChange } : { onChange: handleChange };
    return (<input type={props.type} className="form-control" defaultValue={props.propertyValue} {...inputProps}/>);
};
var BooleanInputTemplate = function (props) {
    var handleChange = function (e) {
        props.onChange((e.target["value"] === 'option-true'));
    };
    return (<react_bootstrap_1.Row>
            <react_bootstrap_1.Col sm={6}>
                <react_bootstrap_1.Radio onChange={handleChange} value="option-true" name={props.propertyName} checked={props.propertyValue}>
                    {props.radioButtonLabels && props.radioButtonLabels.first ? props.radioButtonLabels.first : 'True'}
                </react_bootstrap_1.Radio>
            </react_bootstrap_1.Col>
            <react_bootstrap_1.Col sm={6}>
                <react_bootstrap_1.Radio onChange={handleChange} value="option-false" name={props.propertyName} checked={!props.propertyValue}>
                    {props.radioButtonLabels && props.radioButtonLabels.second
        ? props.radioButtonLabels.second
        : 'False'}
                </react_bootstrap_1.Radio>
            </react_bootstrap_1.Col>
        </react_bootstrap_1.Row>);
};
var DropDownInputTemplate = function (props) {
    var handleChange = function (e) {
        props.onChange(e.target["value"]);
    };
    return (<select value={props.propertyValue} className="form-control" onChange={handleChange}>
            <option value="" style={{
        color: 'grey',
        pointerEvents: 'none',
    }}>Select One</option>
            {(function () {
        var enumInstance = props.enum;
        if (appService_1.isEmpty(enumInstance)) {
            return;
        }
        var optionElements = [];
        enumInstance.forEach(function (element, index) {
            optionElements.push(<option key={index} value={element.value}>
                            {element.label}
                        </option>);
        });
        return optionElements;
    })()}
        </select>);
};
// TODO Add support for nested objects list in this component.
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
        return (<div>
                <react_bootstrap_1.Row>
                    <react_bootstrap_1.Col sm={8}>
                        <react_bootstrap_1.FormControl type="text" value={this.state.newListItem} onChange={this.handleTextChange}/>
                    </react_bootstrap_1.Col>
                    <react_bootstrap_1.Col sm={4}>
                        <react_bootstrap_1.Button bsStyle="default" onClick={this.addListItem}>Add</react_bootstrap_1.Button>
                    </react_bootstrap_1.Col>
                </react_bootstrap_1.Row>
                <react_bootstrap_1.ListGroup style={{ margin: '10px' }}>
                {(function () {
            return list.map(function (listItem, index) {
                return (<react_bootstrap_1.ListGroupItem style={{ wordWrap: 'break-word' }} key={_this.props.propertyName + "-" + index}>
                                {listItem}
                            </react_bootstrap_1.ListGroupItem>);
            });
        })()}
                </react_bootstrap_1.ListGroup>
            </div>);
    };
    return ListInputTemplate;
}(React.Component));
// TODO: Make it generic component by allowing it to accept all props of react-datetime
var DateTimeComponent = (function (_super) {
    __extends(DateTimeComponent, _super);
    function DateTimeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (newValue) {
            if (newValue && newValue._d) {
                _this.props.change(_this.props.model, newValue._d.toISOString());
            }
        };
        return _this;
    }
    DateTimeComponent.prototype.render = function () {
        return (<ReactDatetime defaultValue={this.props.propertyValue ?
            moment(this.props.propertyValue).format('MM-DD-YYYY HH:mm') : ''} strictParsing={true} utc={true} onChange={this.handleChange}/>);
    };
    return DateTimeComponent;
}(React.Component));
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
        return (<react_bootstrap_1.FormGroup className="row" style={{ margin: '0px' }}>
                <react_bootstrap_1.Col sm={this.props.labelSize}>
                    <react_bootstrap_1.ControlLabel style={{ textAlign: 'right' }}>{this.props.propertyName}</react_bootstrap_1.ControlLabel>
                </react_bootstrap_1.Col>
                <react_bootstrap_1.Col sm={this.props.fieldSize} style={this.props.style}>
                    <InputTemplate {...this.props} value={propertyValue} onChange={this.handleChange}/>
                </react_bootstrap_1.Col>
            </react_bootstrap_1.FormGroup>);
    };
    return FormInputImpl;
}(React.Component));
FormInputImpl.defaultProps = {
    fieldSize: 9,
    labelSize: 3,
    model: '',
    enum: '',
    type: '',
    propertyName: '',
};
var mapStateToProps = function (state, ownProps) {
    var data = state.forms || {};
    return {
        propertyValue: commonUtils_1.getNestedData(data, ownProps.model),
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
