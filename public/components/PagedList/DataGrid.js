"use strict";
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_1 = require("react-router");
var appService_1 = require("../../utils/appService");
function DataGrid(_a) {
    var instanceList = _a.instanceList, properties = _a.properties, resource = _a.resource;
    if (!instanceList || !instanceList.length) {
        return React.createElement("div", null);
    }
    resource = instanceList[0] ? instanceList[0].resourceName : '';
    if (!properties.length) {
        properties = instanceList[0].columnNames || Object.keys(instanceList[0].properties);
    }
    return (React.createElement("div", { className: "data-grid" },
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(react_bootstrap_1.Table, { responsive: true, striped: true, bordered: true, hover: true },
            React.createElement("thead", null,
                React.createElement("tr", { className: "data-grid-header" },
                    React.createElement("th", null, "#"),
                    properties.map(function (property, index) {
                        return (React.createElement("th", { key: index }, property.capitalize()));
                    }),
                    React.createElement("th", null, "Actions"))),
            React.createElement("tbody", null, instanceList.map(function (instance, index) {
                var instanceProperties = instance.properties;
                return (React.createElement("tr", { key: index, className: "data-grid-row" },
                    React.createElement("td", null, index),
                    properties.map(function (property, propertyIndex) {
                        return (React.createElement("td", { key: "property-" + propertyIndex }, (function () {
                            if (property.indexOf('.') > 0) {
                                return appService_1.getInnerData(instanceProperties, property);
                            }
                            if (!instanceProperties[property]) {
                                return instanceProperties[property];
                            }
                            return instanceProperties[property].toString();
                        })()));
                    }),
                    React.createElement("td", null,
                        React.createElement(react_router_1.Link, { to: "/" + resource + "/edit/" + instanceProperties.id },
                            React.createElement("i", { className: "fa fa-pencil" })),
                        React.createElement(react_router_1.Link, { to: "/" + resource + "/show/" + instanceProperties.id },
                            React.createElement("i", { className: "fa fa-location-arrow" })))));
            })))));
}
exports.DataGrid = DataGrid;
//# sourceMappingURL=DataGrid.js.map