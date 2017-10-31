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
var react_motion_1 = require("react-motion");
var modelActions_1 = require("../../../actions/modelActions");
var navMenuAction_1 = require("../../../actions/navMenuAction");
require('../../../../styles/index.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/css/font-awesome.min.css');
var connect = require('react-redux').connect;
var SliderNavImpl = (function (_super) {
    __extends(SliderNavImpl, _super);
    function SliderNavImpl(props) {
        var _this = _super.call(this, props) || this;
        _this.checkRender = function () {
            if (_this.props.primaryNavCount >= 2 || _this.props.secondaryNavCount >= 2) {
                console.error('Navigation Component can\'t be more than one');
                return false;
            }
            return true;
        };
        props.isPrimaryNav ? props.setPrimaryNav(true) : props.setSecondaryNav(true);
        return _this;
    }
    SliderNavImpl.prototype.render = function () {
        var _this = this;
        var _a = this.props, isPrimaryNav = _a.isPrimaryNav, toggleNavHandler = _a.toggleNavHandler, toggleSecondaryNavHandler = _a.toggleSecondaryNavHandler, navStyle = _a.navStyle;
        var menuPosition = isPrimaryNav ? 'left' : 'right';
        var navMenuClasses = "nav-menu " + menuPosition;
        var menuClosePosition = isPrimaryNav ? -100 : 100;
        var closeButtonClasses = 'fa fa-times highlight-on-hover ';
        closeButtonClasses += isPrimaryNav ? 'right' : 'left';
        var motion = React.createElement(react_motion_1.Motion, { style: { x: react_motion_1.spring(this.props[isPrimaryNav ? 'primaryNavOpen' : 'secondaryNavOpen'] ?
                    0 : menuClosePosition) }, key: isPrimaryNav ? 'primary-nav' : 'secondary-nav' }, function (_a) {
            var x = _a.x;
            return React.createElement("div", { className: navMenuClasses, style: [
                    {
                        WebkitTransform: "translate3d(" + x + "%, 0, 0)",
                        transform: "translate3d(" + x + "%, 0, 0)",
                    },
                    navStyle,
                ] },
                React.createElement("i", { className: closeButtonClasses, onClick: isPrimaryNav ? toggleNavHandler : toggleSecondaryNavHandler }),
                _this.props.navContent);
        });
        return this.checkRender() ? motion : null;
    };
    SliderNavImpl = __decorate([
        Radium
    ], SliderNavImpl);
    return SliderNavImpl;
}(React.Component));
exports.SliderNavImpl = SliderNavImpl;
var mapStateToProps = function (state) {
    return {
        primaryNavOpen: state.primaryNavOpen,
        secondaryNavOpen: state.secondaryNavOpen,
        primaryNavCount: state.navMenu.primaryNavCount,
        secondaryNavCount: state.navMenu.secondaryNavCount,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        toggleNavHandler: function () { return dispatch(modelActions_1.toggleNav()); },
        toggleSecondaryNavHandler: function () { return dispatch(modelActions_1.toggleSecondaryNav()); },
        setPrimaryNav: function (visibilityStatus) { return dispatch(navMenuAction_1.showPrimaryNav(visibilityStatus)); },
        setSecondaryNav: function (visibilityStatus) { return dispatch(navMenuAction_1.showSecondaryNav(visibilityStatus)); },
    };
};
exports.SliderNav = connect(mapStateToProps, mapDispatchToProps)(SliderNavImpl);
//# sourceMappingURL=SliderNav.js.map