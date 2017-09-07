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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Radium = require("radium");
var react_bootstrap_1 = require("react-bootstrap");
var store_1 = require("../../store");
var react_redux_1 = require("react-redux");
var userActions_1 = require("../../actions/userActions");
var UserActionsImpl = (function (_super) {
    __extends(UserActionsImpl, _super);
    function UserActionsImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listItems = ['--User Action--'];
        _this.componentWillMount = function () {
            if (_this.props.userActionsMap && _this.props.userActionsMap.length > 0) {
                var actionMap = _this.props.userActionsMap;
                actionMap.forEach(function (action) {
                    if (_this.listItems.indexOf(action.label) === -1) {
                        _this.listItems.push(action.label);
                    }
                });
            }
        };
        _this.renderDropDownItems = function () {
            var list = [];
            _this.listItems.forEach(function (item, index) {
                list.push(React.createElement("option", { value: item, key: index }, item));
            });
            return list;
        };
        _this.saveAction = function (event) {
            store_1.store.dispatch(userActions_1.saveUserAction(event.target["value"]));
        };
        _this.performAction = function () {
            var userActionsMap = _this.props.userActionsMap;
            userActionsMap.every(function (item) {
                if (item.label === _this.props.action) {
                    _this.saveUserActionData();
                    item.action();
                    return false;
                }
                return true;
            });
        };
        _this.saveUserActionData = function () {
            var records = _this.props.selectAll ? _this.props.totalCount :
                _this.props.selectedIds && _this.props.selectedIds.length;
            store_1.store.dispatch(userActions_1.saveUserActionData(records));
        };
        return _this;
    }
    UserActionsImpl.prototype.render = function () {
        return (React.createElement("div", { style: this.props.style || rightStyle },
            React.createElement("select", { value: this.props.action, onChange: this.saveAction, disabled: this.props.selectedIds.length === 0, style: this.props.selectedIds.length === 0 ? [disabledStyle, dropDownStyle] : dropDownStyle }, this.renderDropDownItems()),
            React.createElement(react_bootstrap_1.Button, { disabled: this.props.action === this.listItems[0] || this.props.selectedIds.length === 0, onClick: this.performAction, style: (this.props.action === this.listItems[0] || this.props.selectedIds.length === 0) ?
                    disabledStyle : null }, "Go")));
    };
    return UserActionsImpl;
}(React.Component));
UserActionsImpl = __decorate([
    Radium
], UserActionsImpl);
exports.UserActionsImpl = UserActionsImpl;
var mapStateToProps = function (state) {
    return {
        action: state.userAction.action,
        selectedIds: state.checkbox.selectedIds,
        selectAllOnPage: state.checkbox.selectAllOnPage,
        selectAll: state.checkbox.selectAll,
    };
};
var UserActions = react_redux_1.connect(mapStateToProps)(UserActionsImpl);
exports.UserActions = UserActions;
var rightStyle = {
    textAlign: 'right',
};
var dropDownStyle = {
    textAlign: 'center',
    border: '1px solid #d9d9d9',
    borderRadius: '3px',
    display: 'inline-block',
    fontSize: '12px',
    fontFamily: 'Lato, arial, sans-serif',
    maxWidth: '150px',
    minHeight: '35px',
    padding: '5px 10px',
    transition: 'border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s',
    margin: '0px 5px',
};
var disabledStyle = {
    background: '#eee none repeat scroll 0% 0% / auto padding-box border-box',
    cursor: 'not-allowed',
};
//# sourceMappingURL=BulkUserActions.js.map