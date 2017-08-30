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
var NavMenuLauncherIcon_1 = require("../NavMenuLauncherIcon");
var modelActions_1 = require("../../actions/modelActions");
var connect = require('react-redux').connect;
var HeaderViewImpl = (function (_super) {
    __extends(HeaderViewImpl, _super);
    function HeaderViewImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderViewImpl.prototype.render = function () {
        return (<div style={[exports.headerStyle, this.props.style]} className="header">
                {this.props.primaryNav &&
            <NavMenuLauncherIcon_1.NavMenuLauncherIcon style={exports.navIconStyle} position={'left'} onClick={this.props.toggleNav}/>}
                {this.props.secondaryNav &&
            <NavMenuLauncherIcon_1.NavMenuLauncherIcon style={exports.navIconStyle} position={'right'} onClick={this.props.toggleSecondaryNav}/>}
                {this.props.children}
            </div>);
    };
    return HeaderViewImpl;
}(React.Component));
HeaderViewImpl = __decorate([
    Radium
], HeaderViewImpl);
exports.HeaderViewImpl = HeaderViewImpl;
exports.headerStyle = {
    position: 'relative',
    top: 0,
    width: '100%',
};
exports.navIconStyle = {
    color: '#777',
};
var mapStateToProps = function (state) {
    return {
        secondaryNav: state.navMenu.secondaryNav,
        primaryNav: state.navMenu.primaryNav,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        toggleNav: function () { return dispatch(modelActions_1.toggleNav()); },
        toggleSecondaryNav: function () { return dispatch(modelActions_1.toggleSecondaryNav()); },
    };
};
exports.HeaderView = connect(mapStateToProps, mapDispatchToProps)(HeaderViewImpl);
