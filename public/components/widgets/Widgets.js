"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classNames = require('classnames');
exports.Title = function (props) {
    return (React.createElement("div", { className: "title" }, props.children));
};
exports.Description = function (props) {
    return (React.createElement("div", { className: "description" }, props.children));
};
exports.Content = function (props) {
    return (React.createElement("div", { className: "widget-content" }, props.children));
};
exports.ButtonList = function (props) {
    var classes = ['button-list '];
    if (props.highlightOnHover) {
        classes.push('highlight');
    }
    return (React.createElement("ul", { className: classNames(classes) }, props.children));
};
exports.ButtonListItem = function (props) {
    var classes = ['button-list-item '];
    if (props.highlightOnHover) {
        classes.push('highlight-on-hover');
    }
    return (React.createElement("li", { className: classNames((classes)) }, props.children));
};
//# sourceMappingURL=Widgets.js.map