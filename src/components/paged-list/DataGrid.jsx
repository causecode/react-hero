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
var Radium = require("radium");
var react_router_dom_1 = require("react-router-dom");
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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleChange = function (id, event) {
            // For selectAllOnPage id will be -1
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
            // For selectAll id will be -2
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
            var style = _this.props.style;
            return (<tr style={style.rowStyle}>
                <th style={style.headerStyle}>
                    <input type="checkbox" onChange={_this.handleChange.bind(_this, -2)} checked={_this.props.selectAll}/>
                </th>
                <td colSpan={_this.properties.length + 2} style={style.dataStyle}>
                    All <strong>{_this.props.instanceList.length}</strong> records visible on this page are selected.
                    Click to select all <strong>{_this.props.totalCount}</strong> records.
                </td>
            </tr>);
        };
        // type 'any' is intentional.
        _this.renderActions = function (instance) {
            var _a = _this.props, showDefaultActions = _a.showDefaultActions, customActions = _a.customActions, handleRecordDelete = _a.handleRecordDelete, style = _a.style;
            // TODO: Figure out the type and remove any
            var CustomAction = customActions;
            var ActionComponent = appService_1.getActionComponent(_this.resource + "Action");
            var tooltip = (<react_bootstrap_1.Tooltip id="tooltip"><strong>Remove from List</strong></react_bootstrap_1.Tooltip>);
            if (CustomAction && typeof CustomAction === 'function') {
                return (<td style={style.dataStyle}><CustomAction instance={instance}/></td>);
            }
            if (CustomAction && typeof CustomAction === 'object') {
                return <td style={style.dataStyle}>{React.cloneElement(CustomAction, { instance: instance })}</td>;
            }
            if (ActionComponent && React.isValidElement(<ActionComponent />)) {
                return <td style={style.dataStyle}><ActionComponent instance={instance}/></td>;
            }
            if (showDefaultActions) {
                return (<td>
                    <react_router_dom_1.Link style={style.dataStyle} to={"/" + _this.resource + "/edit/" + instance.id}>
                        <RadiumFontAwesome name="pencil"/>
                    </react_router_dom_1.Link>
                    <react_router_dom_1.Link style={style.dataStyle} to={"/" + _this.resource + "/show/" + instance.id}>
                        <RadiumFontAwesome name="location-arrow"/>
                    </react_router_dom_1.Link>
                    <react_bootstrap_1.OverlayTrigger placement="top" overlay={tooltip}>
                        <a onClick={handleRecordDelete && handleRecordDelete.bind(_this, instance.id)} style={style.dataStyle || trashIconStyle} id={"delete" + instance.id}>
                            <RadiumFontAwesome name="trash-o"/>
                        </a>
                    </react_bootstrap_1.OverlayTrigger>
                </td>);
            }
            return null;
        };
        _this.renderCount = function () {
            var _a = _this.props, max = _a.max, offset = _a.offset, totalCount = _a.totalCount, style = _a.style;
            if (!max || !totalCount) {
                return null;
            }
            return (<tr style={style.rowStyle} id="totalCount">
                <td style={style.dataStyle} colSpan={_this.properties.length + 3}>
                    Showing <strong>{offset + 1} - {(totalCount <= offset + max) ? totalCount : offset + max}</strong>
                    &nbsp;of <strong>{totalCount}</strong>
                </td>
            </tr>);
        };
        return _this;
    }
    DataGridImpl.prototype.render = function () {
        var _this = this;
        if (!this.props.instanceList || !this.props.instanceList.length) {
            return <div style={{ margin: '40px 0px 0px 0px' }}>Sorry, No entry found.</div>;
        }
        this.resource = this.props.instanceList[0] ? this.props.instanceList[0].resourceName : '';
        if (!this.props.properties || !this.props.properties.length) {
            // TODO Better names for the properties array which is supposed to be send by the server.
            var instance = this.props.instanceList[0];
            var columnNames_1 = [];
            var propertyNames_1 = [];
            // To make it backward compatible
            if (instance.columnNames && typeof instance.columnNames[0] === 'object') {
                instance.columnNames.forEach(function (property) {
                    columnNames_1.push(property.label);
                    propertyNames_1.push(property.accessor);
                });
            }
            this.columnNames = columnNames_1.length > 0 ? columnNames_1 : this.properties;
            this.properties = propertyNames_1.length > 0 ? propertyNames_1 :
                Object.keys(this.props.instanceList[0].properties);
        }
        else {
            this.properties = this.props.properties;
            this.columnNames = this.props.properties;
        }
        var _a = this.props, showDefaultActions = _a.showDefaultActions, customActions = _a.customActions, style = _a.style, isBordered = _a.isBordered;
        var listIndex = this.props.offset + 1;
        return (<div className="data-grid">
                <br /><br />
                <react_bootstrap_1.Table responsive striped bordered={isBordered} hover>
                    <thead>
                        {this.props.selectAllOnPage ? this.renderSelectAllRecordsCheckbox() : null}
                        <tr style={style.rowStyle} className="data-grid-header">
                            <th style={style.headerStyle}>
                                <input type="checkbox" checked={this.props.selectAllOnPage &&
            this.props.selectedIds.length === this.props.instanceList.length} onChange={this.handleChange.bind(this, -1)}/>
                            </th>
                            <th style={style.headerStyle}>#</th>
                            {this.columnNames.map(function (columnName, index) {
            return (<th style={style.headerStyle} key={index}>{columnName.capitalize()}</th>);
        })}
                            {showDefaultActions || customActions ? <th style={style.headerStyle}>Actions</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.instanceList.map(function (instance, index) {
            var instanceProperties = instance.properties;
            return (<tr style={style.rowStyle} key={index} className="data-grid-row">
                                    <td style={style.dataStyle}>
                                        <input type="checkbox" checked={_this.props.selectedIds &&
                _this.props.selectedIds.indexOf(instanceProperties.id) !== -1} onChange={_this.handleChange.bind(_this, instanceProperties.id)}/>
                                    </td>
                                    <td style={style.dataStyle}>{listIndex++}</td>
                                    {_this.properties.map(function (property, key) {
                return (<td style={style.dataStyle} key={"property-" + key}>
                                                {_this.getInnerHtml(property, instance, instanceProperties)}
                                            </td>);
            })}
                                    {_this.renderActions(instanceProperties)}
                                </tr>);
        })}
                            {this.renderCount()}
                    </tbody>
                </react_bootstrap_1.Table>
            </div>);
    };
    return DataGridImpl;
}(React.Component));
DataGridImpl.defaultProps = {
    showDefaultActions: true,
};
exports.DataGridImpl = DataGridImpl;
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
