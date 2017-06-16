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
var NavMenuLauncherIcon_1 = require("./NavMenuLauncherIcon");
var react_motion_1 = require("react-motion");
var modelActions_1 = require("../actions/modelActions");
var objectAssign = require('object-assign');
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderView.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return HeaderView;
}(React.Component));
HeaderView.componentType = headerType;
exports.HeaderView = HeaderView;
var FooterView = (function (_super) {
    __extends(FooterView, _super);
    function FooterView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FooterView.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return FooterView;
}(React.Component));
FooterView.componentType = footerType;
exports.FooterView = FooterView;
var ContentView = (function (_super) {
    __extends(ContentView, _super);
    function ContentView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContentView.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return ContentView;
}(React.Component));
ContentView.componentType = contentType;
exports.ContentView = ContentView;
var NavigationMenu = (function (_super) {
    __extends(NavigationMenu, _super);
    function NavigationMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationMenu.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return NavigationMenu;
}(React.Component));
NavigationMenu.componentType = navigationMenuType;
exports.NavigationMenu = NavigationMenu;
var mapStateToProps = function (state) {
    return {
        open: state.open
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        toggleNav: function () { return dispatch(modelActions_1.toggleNav()); }
    };
};
var HeaderFooterLayoutImpl = (function (_super) {
    __extends(HeaderFooterLayoutImpl, _super);
    function HeaderFooterLayoutImpl(props) {
        var _this = _super.call(this) || this;
        _this.isNavBarPresent = false;
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
                    _this.setNav(child);
                    break;
            }
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
    HeaderFooterLayoutImpl.prototype.setNav = function (NavImpl) {
        this.isNavBarPresent = true;
        this.nav = NavImpl;
    };
    HeaderFooterLayoutImpl.prototype.componentWillMount = function () {
        if (this.isNavBarPresent && !this.props.menuPosition) {
            throw new Error('The prop menuPosition has not been defined.');
        }
    };
    HeaderFooterLayoutImpl.prototype.render = function () {
        var _this = this;
        var _a = this.props, toggleNav = _a.toggleNav, menuPosition = _a.menuPosition, style = _a.style;
        var navMenuClasses = "nav-menu " + menuPosition;
        var menuClosePosition = (menuPosition === 'left') ? -100 : 100;
        var closeButtonClasses = 'fa fa-times highlight-on-hover ';
        closeButtonClasses += (menuPosition === 'left') ? 'right' : 'left';
        var getNavMenu = function () {
            if (_this.isNavBarPresent) {
                return (React.createElement(react_motion_1.Motion, { style: { x: react_motion_1.spring(_this.props.open ? 0 : menuClosePosition) } }, function (_a) {
                    var x = _a.x;
                    return React.createElement("div", { className: navMenuClasses, style: objectAssign({}, { WebkitTransform: "translate3d(" + x + "%, 0, 0)",
                            transform: "translate3d(" + x + "%, 0, 0)" }, style.nav || {}) },
                        React.createElement("i", { className: closeButtonClasses, onClick: toggleNav }),
                        _this.nav);
                }));
            }
            else {
                return;
            }
        };
        return (React.createElement("div", null,
            getNavMenu(),
            React.createElement("div", { className: "header", style: style.header },
                (function () {
                    if (_this.isNavBarPresent) {
                        return (React.createElement(NavMenuLauncherIcon_1.NavMenuLauncherIcon, { style: style.navIcon, position: "" + _this.props.menuPosition, onClick: toggleNav }));
                    }
                })(),
                this.header),
            React.createElement("div", { className: "content", style: style.content }, this.content),
            React.createElement("div", { className: "footer", style: style.footer }, this.footer)));
    };
    return HeaderFooterLayoutImpl;
}(React.Component));
HeaderFooterLayoutImpl.defaultProps = {
    menuPosition: 'left',
    style: {
        header: {},
        nav: {},
        content: {},
        footer: {},
        navIcon: {}
    }
};
exports.HeaderFooterLayoutImpl = HeaderFooterLayoutImpl;
var HeaderFooterLayout = connect(mapStateToProps, mapDispatchToProps)(HeaderFooterLayoutImpl);
exports.HeaderFooterLayout = HeaderFooterLayout;
//# sourceMappingURL=HeaderFooterLayout.js.map