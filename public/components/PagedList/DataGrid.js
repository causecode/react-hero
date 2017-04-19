"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Radium = require("radium");
var react_router_1 = require("react-router");
var react_bootstrap_1 = require("react-bootstrap");
var react_redux_1 = require("react-redux");
var appService_1 = require("../../utils/appService");
var checkboxActions_1 = require("../../actions/checkboxActions");
var constants_1 = require("../../constants");
var FontAwesome = require("react-fontawesome");
var RadiumFontAwesome = Radium(FontAwesome);
;
var DataGridImpl = (function (_super) {
    __extends(DataGridImpl, _super);
    function DataGridImpl() {
        var _this = _super.apply(this, arguments) || this;
        _this.handleChange = function (id, event) {
            if (id === -1) {
                if (event.target["checked"]) {
                    _this.toggleAllCheckboxes(event.target["checked"]);
                }
                else {
                    _this.props.selectAllRecords(false);
                    _this.toggleAllCheckboxes(event.target["checked"]);
                }
                _this.props.selectAllRecordsOnPage(event.target["checked"]);
                return;
            }
            if (id === -2) {
                _this.props.selectAllRecords(event.target["checked"]);
                return;
            }
            if (event.target["checked"]) {
                _this.props.setChecked(id);
            }
            else {
                _this.props.setUnchecked(id);
                _this.props.selectAllRecordsOnPage(false);
                _this.props.selectAllRecords(false);
            }
        };
        _this.toggleAllCheckboxes = function (isChecked) {
            var instances = _this.props.instanceList;
            if (isChecked) {
                for (var i = 0; i < instances.length; i++) {
                    if (_this.props.selectedIds && _this.props.selectedIds.indexOf(instances[i].properties.id) === -1) {
                        _this.props.setChecked(instances[i].properties.id);
                    }
                }
            }
            else {
                for (var i = 0; i < instances.length; i++) {
                    _this.props.setUnchecked(instances[i].properties.id);
                }
            }
        };
        _this.getInnerHtml = function (property, instance, instanceProperties) {
            if (property.indexOf('.') > 0) {
                var method = instance['getHTML' + property.capitalize().substring(0, property.indexOf('.'))];
                if (method) {
                    return method(instanceProperties);
                }
                return appService_1.getInnerData(instanceProperties, property);
            }
            else {
                if (instance['getHTML' + property.capitalize()]) {
                    return instance['getHTML' + property.capitalize()](instanceProperties);
                }
                if (!instanceProperties[property]) {
                    return instanceProperties[property];
                }
                return instanceProperties[property].toString();
            }
        };
        _this.renderSelectAllRecordsCheckbox = function () {
            return (React.createElement("tr", null,
                React.createElement("th", null,
                    React.createElement("input", { type: "checkbox", onChange: _this.handleChange.bind(_this, -2), checked: _this.props.selectAll })),
                React.createElement("td", { colSpan: _this.properties.length + 2 },
                    "All ",
                    React.createElement("strong", null, _this.props.instanceList.length),
                    " records visible on this page are selected." + " " + "Click to select all ",
                    React.createElement("strong", null, _this.props.totalCount),
                    " records.")));
        };
        _this.renderActions = function (instance) {
            var _a = _this.props, showDefaultActions = _a.showDefaultActions, customActions = _a.customActions, handleRecordDelete = _a.handleRecordDelete;
            var CustomAction = customActions;
            var ActionComponent = appService_1.getActionComponent(_this.resource + "Action");
            var tooltip = (React.createElement(react_bootstrap_1.Tooltip, { id: "tooltip" },
                React.createElement("strong", null, "Remove from List")));
            if (CustomAction && typeof CustomAction === 'function') {
                return (React.createElement("td", null,
                    React.createElement(CustomAction, { instance: instance })));
            }
            if (CustomAction && typeof CustomAction === 'object') {
                return React.createElement("td", null, React.cloneElement(CustomAction, { instance: instance }));
            }
            if (ActionComponent && React.isValidElement(React.createElement(ActionComponent, null))) {
                return React.createElement("td", null,
                    React.createElement(ActionComponent, { instance: instance }));
            }
            if (showDefaultActions) {
                return (React.createElement("td", null,
                    React.createElement(react_router_1.Link, { to: "/" + _this.resource + "/edit/" + instance.id },
                        React.createElement(RadiumFontAwesome, { name: "pencil" })),
                    React.createElement(react_router_1.Link, { to: "/" + _this.resource + "/show/" + instance.id },
                        React.createElement(RadiumFontAwesome, { name: "location-arrow" })),
                    React.createElement(react_bootstrap_1.OverlayTrigger, { placement: "top", overlay: tooltip },
                        React.createElement("a", { onClick: handleRecordDelete && handleRecordDelete.bind(_this, instance.id), style: trashIconStyle, id: "delete" + instance.id },
                            React.createElement(RadiumFontAwesome, { name: "trash-o" })))));
            }
            return null;
        };
        return _this;
    }
    DataGridImpl.prototype.render = function () {
        var _this = this;
        if (!this.props.instanceList || !this.props.instanceList.length) {
            return React.createElement("div", { style: { margin: '40px 0px 0px 0px' } }, "Sorry, No entry found.");
        }
        this.resource = this.props.instanceList[0] ? this.props.instanceList[0].resourceName : '';
        if (!this.props.properties || !this.props.properties.length) {
            this.properties = this.props.instanceList[0].columnNames ||
                Object.keys(this.props.instanceList[0].properties);
        }
        else {
            this.properties = this.props.properties;
        }
        var _a = this.props, showDefaultActions = _a.showDefaultActions, customActions = _a.customActions;
        return (React.createElement("div", { className: "data-grid" },
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(react_bootstrap_1.Table, { responsive: true, striped: true, bordered: true, hover: true },
                React.createElement("thead", null,
                    this.props.selectAllOnPage ? this.renderSelectAllRecordsCheckbox() : null,
                    React.createElement("tr", { className: "data-grid-header" },
                        React.createElement("th", null,
                            React.createElement("input", { type: "checkbox", checked: this.props.selectAllOnPage &&
                                    this.props.selectedIds.length === this.props.instanceList.length, onChange: this.handleChange.bind(this, -1) })),
                        React.createElement("th", null, "#"),
                        this.properties.map(function (property, index) {
                            return (React.createElement("th", { key: index }, property.capitalize()));
                        }),
                        showDefaultActions || customActions ? React.createElement("th", null, "Actions") : null)),
                React.createElement("tbody", null, this.props.instanceList.map(function (instance, index) {
                    var instanceProperties = instance.properties;
                    return (React.createElement("tr", { key: index, className: "data-grid-row" },
                        React.createElement("td", null,
                            React.createElement("input", { type: "checkbox", checked: _this.props.selectedIds &&
                                    _this.props.selectedIds.indexOf(instanceProperties.id) !== -1, onChange: _this.handleChange.bind(_this, instanceProperties.id) })),
                        React.createElement("td", null, index),
                        _this.properties.map(function (property, key) {
                            return (React.createElement("td", { key: "property-" + key }, _this.getInnerHtml(property, instance, instanceProperties)));
                        }),
                        _this.renderActions(instanceProperties)));
                })))));
    };
    return DataGridImpl;
}(React.Component));
exports.DataGridImpl = DataGridImpl;
DataGridImpl.defaultProps = {
    showDefaultActions: true,
};
var mapStateToProps = function (state) {
    return {
        selectedIds: state.checkbox.selectedIds,
        selectAllOnPage: state.checkbox.selectAllOnPage,
        selectAll: state.checkbox.selectAll,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        selectAllRecords: function (isChecked) {
            dispatch(checkboxActions_1.selectAllRecords(constants_1.SELECT_ALL_RECORDS, isChecked));
        },
        selectAllRecordsOnPage: function (isChecked) {
            dispatch(checkboxActions_1.selectAllRecords(constants_1.SELECT_ALL_RECORDS_ON_PAGE, isChecked));
        },
        setChecked: function (id) {
            dispatch(checkboxActions_1.toggleCheckbox(constants_1.CHECK_CHECKBOX, id));
        },
        setUnchecked: function (id) {
            dispatch(checkboxActions_1.toggleCheckbox(constants_1.UNCHECK_CHECKBOX, id));
        },
    };
};
var DataGrid = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DataGridImpl);
exports.DataGrid = DataGrid;
var trashIconStyle = {
    color: '#337ab7',
    cursor: 'pointer',
    textDecoration: 'none',
};
//# sourceMappingURL=DataGrid.js.map