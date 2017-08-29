"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classNames = require('classnames');
exports.Title = function (props) {
    return (<div className="title">{props.children}</div>);
};
exports.Description = function (props) {
    return (<div className="description">{props.children}</div>);
};
exports.Content = function (props) {
    return (<div className="widget-content">{props.children}</div>);
};
exports.ButtonList = function (props) {
    var classes = ['button-list '];
    if (props.highlightOnHover) {
        classes.push('highlight');
    }
    return (<ul className={classNames(classes)}>{props.children}</ul>);
};
exports.ButtonListItem = function (props) {
    var classes = ['button-list-item '];
    if (props.highlightOnHover) {
        classes.push('highlight-on-hover');
    }
    return (<li className={classNames((classes))}>{props.children}</li>);
};
