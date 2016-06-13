"use strict";
var React = require('react');
exports.Title = function (props) {
    return (React.createElement("div", {className: "title"}, props.children));
};
exports.Description = function (props) {
    return (React.createElement("div", {className: "description"}, props.children));
};
exports.Content = function (props) {
    return (React.createElement("div", {className: "widget-content"}, props.children));
};
exports.ButtonList = function (props) {
    var classes = "button-list ";
    classes += props.highlightOnHover ? "highlight" : "";
    return (React.createElement("ul", {className: classes}, props.children));
};
exports.ButtonListItem = function (props) {
    var classes = "button-list-item ";
    classes += props.highlightOnHover ? "highlight-on-hover" : "";
    return (React.createElement("li", {className: classes}, props.children));
};
//# sourceMappingURL=Widgets.js.map