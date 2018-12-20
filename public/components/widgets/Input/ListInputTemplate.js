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
var react_bootstrap_1 = require("react-bootstrap");
var ReusableComponents_1 = require("../../ReusableComponents");
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
        var style = this.props.style;
        var inputCSS = style && style.inputCSS ? style.inputCSS : {};
        var listCSS = style && style.listCSS ? style.listCSS : {};
        var btnCSS = style && style.btnCSS ? style.btnCSS : {};
        var list = this.props.propertyValue || ['Nothing to show.'];
        return (React.createElement("div", null,
            React.createElement(ReusableComponents_1.Row, null,
                React.createElement(ReusableComponents_1.Col, { sm: 8 },
                    React.createElement(ReusableComponents_1.FormControl, { type: "text", value: this.state.newListItem, onChange: this.handleTextChange, style: inputCSS })),
                React.createElement(ReusableComponents_1.Col, { sm: 4 },
                    React.createElement(ReusableComponents_1.Button, { bsStyle: "default", style: btnCSS, onClick: this.addListItem }, "Add"))),
            React.createElement(react_bootstrap_1.ListGroup, { style: { margin: '10px' } }, list.map(function (listItem, index) {
                return (React.createElement(react_bootstrap_1.ListGroupItem, { style: __assign({ wordWrap: 'break-word' }, listCSS), key: _this.props.propertyName + "-" + index }, listItem));
            }))));
    };
    return ListInputTemplate;
}(React.Component));
exports.ListInputTemplate = ListInputTemplate;
//# sourceMappingURL=ListInputTemplate.js.map