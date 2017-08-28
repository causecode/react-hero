"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var Radium = require("radium");
var NavMenuLauncherIcon_1 = require("./NavMenuLauncherIcon");
var react_motion_1 = require("react-motion");
var modelActions_1 = require("../actions/modelActions");
var connect = require('react-redux').connect;
require('../../styles/index.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/css/font-awesome.min.css');
var headerType = 'Header';
var contentType = 'Content';
var footerType = 'Footer';
var navigationMenuType = 'NavigationMenu';
var HeaderView = (function (_super) {
    __extends(HeaderView, _super);
    function HeaderView() {
        return _super.apply(this, arguments) || this;
    }
    HeaderView.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return HeaderView;
}(React.Component));
exports.HeaderView = HeaderView;
HeaderView.componentType = headerType;
var FooterView = (function (_super) {
    __extends(FooterView, _super);
    function FooterView() {
        return _super.apply(this, arguments) || this;
    }
    FooterView.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return FooterView;
}(React.Component));
exports.FooterView = FooterView;
FooterView.componentType = footerType;
var ContentView = (function (_super) {
    __extends(ContentView, _super);
    function ContentView() {
        return _super.apply(this, arguments) || this;
    }
    ContentView.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return ContentView;
}(React.Component));
exports.ContentView = ContentView;
ContentView.componentType = contentType;
var NavigationMenu = (function (_super) {
    __extends(NavigationMenu, _super);
    function NavigationMenu() {
        return _super.apply(this, arguments) || this;
    }
    NavigationMenu.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return NavigationMenu;
}(React.Component));
exports.NavigationMenu = NavigationMenu;
NavigationMenu.componentType = navigationMenuType;
var mapStateToProps = function (state) {
    return {
        open: state.open,
        secondaryNavOpen: state.secondaryNavOpen,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        toggleNav: function () { return dispatch(modelActions_1.toggleNav()); },
        toggleSecondaryNav: function () { return dispatch(modelActions_1.toggleSecondaryNav()); },
    };
};
var HeaderFooterLayoutImpl = (function (_super) {
    __extends(HeaderFooterLayoutImpl, _super);
    function HeaderFooterLayoutImpl(props) {
        var _this = _super.call(this) || this;
        _this.isNavBarPresent = false;
        _this.isSecondaryNavBarPresent = false;
        _this.navMenuCount = 0;
        _this.parseChild = function (child) {
            switch (child.type.componentType) {
                case headerType:
                    _this.header = child;
                    break;
                case contentType:
                    _this.content = child;
                    break;
                case footerType:
                    _this.footer = child;
                    break;
                case navigationMenuType:
                    if (++_this.navMenuCount <= 2) {
                        _this.setNav(child, _this.navMenuCount);
                    }
                    break;
            }
        };
        _this.renderNavMenuLauncherIcon = function (isPrimaryNav) {
            var _a = _this.props, toggleNav = _a.toggleNav, primaryMenuPosition = _a.primaryMenuPosition, style = _a.style, secondaryMenuPosition = _a.secondaryMenuPosition, toggleSecondaryNav = _a.toggleSecondaryNav;
            return (React.createElement(NavMenuLauncherIcon_1.NavMenuLauncherIcon, { key: "" + (isPrimaryNav ? 'primary-nav-icon' : 'secondary-nav-icon'), style: style.navIcon, position: isPrimaryNav ? primaryMenuPosition : secondaryMenuPosition, onClick: isPrimaryNav ? toggleNav : toggleSecondaryNav }));
        };
        _this.renderNavMenu = function (isPrimaryNav) {
            var _a = _this.props, toggleNav = _a.toggleNav, primaryMenuPosition = _a.primaryMenuPosition, style = _a.style, secondaryMenuPosition = _a.secondaryMenuPosition, toggleSecondaryNav = _a.toggleSecondaryNav;
            var menuPosition = isPrimaryNav ? primaryMenuPosition : secondaryMenuPosition;
            var navMenuClasses = "nav-menu " + menuPosition;
            var menuClosePosition = menuPosition === 'left' ? -100 : 100;
            var closeButtonClasses = 'fa fa-times highlight-on-hover ';
            closeButtonClasses += menuPosition === 'left' ? 'right' : 'left';
            var customStyle = style[isPrimaryNav ? 'primaryNav' : 'secondaryNav'] || {};
            return (React.createElement(react_motion_1.Motion, { style: { x: react_motion_1.spring(_this.props[isPrimaryNav ? 'open' : 'secondaryNavOpen'] ? 0 : menuClosePosition) }, key: isPrimaryNav ? 'primary-nav' : 'secondary-nav' }, function (_a) {
                var x = _a.x;
                return React.createElement("div", { className: navMenuClasses, style: [
                        { WebkitTransform: "translate3d(" + x + "%, 0, 0)", transform: "translate3d(" + x + "%, 0, 0)" },
                        customStyle,
                    ] },
                    React.createElement("i", { className: closeButtonClasses, onClick: isPrimaryNav ? toggleNav : toggleSecondaryNav }),
                    _this[isPrimaryNav ? 'primaryNav' : 'secondaryNav']);
            }));
        };
        _this.header = _this.footer = _this.content = React.createElement("div", null);
        _this.state = { open: false };
        if (props.children) {
            if (props.children.length) {
                for (var _i = 0, _a = props.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    _this.parseChild(child);
                }
            }
            else {
                _this.parseChild(props.children);
            }
        }
        return _this;
    }
    HeaderFooterLayoutImpl.prototype.setHeader = function (headerImpl) {
        this.header = headerImpl;
    };
    HeaderFooterLayoutImpl.prototype.setContent = function (contentImpl) {
        this.content = contentImpl;
    };
    HeaderFooterLayoutImpl.prototype.setFooter = function (footerImpl) {
        this.footer = footerImpl;
    };
    HeaderFooterLayoutImpl.prototype.setNav = function (NavImpl, navMenuCount) {
        if (navMenuCount === 2) {
            this.isSecondaryNavBarPresent = true;
            this.secondaryNav = NavImpl;
        }
        else {
            this.isNavBarPresent = true;
            this.primaryNav = NavImpl;
        }
    };
    HeaderFooterLayoutImpl.prototype.componentWillMount = function () {
        if (this.isNavBarPresent && !this.props.primaryMenuPosition) {
            throw new Error('The prop primaryMenuPosition has not been defined.');
        }
    };
    HeaderFooterLayoutImpl.prototype.render = function () {
        var style = this.props.style;
        return (React.createElement("div", null,
            this.isNavBarPresent && this.renderNavMenu(true),
            this.isSecondaryNavBarPresent && this.renderNavMenu(false),
            React.createElement("div", { className: "header", style: style.header },
                this.isNavBarPresent && this.renderNavMenuLauncherIcon(true),
                this.isSecondaryNavBarPresent && this.renderNavMenuLauncherIcon(false),
                this.header),
            React.createElement("div", { className: "content", style: style.content }, this.content),
            React.createElement("div", { className: "footer", style: style.footer }, this.footer)));
    };
    return HeaderFooterLayoutImpl;
}(React.Component));
HeaderFooterLayoutImpl.defaultProps = {
    primaryMenuPosition: 'left',
    secondaryMenuPosition: 'right',
    style: {
        header: {},
        primaryNav: {},
        secondaryNav: {},
        content: {},
        footer: {},
        navIcon: {},
    },
};
HeaderFooterLayoutImpl = __decorate([
    Radium
], HeaderFooterLayoutImpl);
exports.HeaderFooterLayoutImpl = HeaderFooterLayoutImpl;
var HeaderFooterLayout = connect(mapStateToProps, mapDispatchToProps)(HeaderFooterLayoutImpl);
exports.HeaderFooterLayout = HeaderFooterLayout;
//# sourceMappingURL=HeaderFooterLayout.js.map