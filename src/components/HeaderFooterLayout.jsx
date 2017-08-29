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
var NavMenuLauncherIcon_1 = require("./NavMenuLauncherIcon");
var modelActions_1 = require("../actions/modelActions");
// Importing connect this way because of bug in react-redux type definition
// TODO Revisit https://github.com/DefinitelyTyped/DefinitelyTyped/issues/8866
var connect = require('react-redux').connect;
// Importing styles.
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
    // TODO Add Header specific behaviour.
    HeaderView.prototype.render = function () {
        return <div>{this.props.children}</div>;
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
    // TODO Add Footer specific behaviour.
    FooterView.prototype.render = function () {
        return <div>{this.props.children}</div>;
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
        return <div>{this.props.children}</div>;
    };
    return ContentView;
}(React.Component));
// TODO Add Content specific behaviour.
ContentView.componentType = contentType;
exports.ContentView = ContentView;
var NavigationMenu = (function (_super) {
    __extends(NavigationMenu, _super);
    function NavigationMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationMenu.prototype.render = function () {
        return <div>{this.props.children}</div>;
    };
    return NavigationMenu;
}(React.Component));
// TODO Add NavigationMenu specific behaviour.
NavigationMenu.componentType = navigationMenuType;
exports.NavigationMenu = NavigationMenu;
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
        // type `any` is intentional because child can be anything.
        _this.parseChild = function (child) {
            switch (child.type.componentType) {
                case headerType:
                    _this.setHeader(child);
                    break;
                case contentType:
                    _this.setContent(child);
                    break;
                case footerType:
                    _this.setFooter(child);
                    break;
                case navigationMenuType:
                    _this.setNav(child);
                    break;
            }
        };
        _this.renderNavMenuLauncherIcon = function (isPrimaryNav) {
            var _a = _this.props, toggleNav = _a.toggleNav, primaryMenuPosition = _a.primaryMenuPosition, style = _a.style, secondaryMenuPosition = _a.secondaryMenuPosition, toggleSecondaryNav = _a.toggleSecondaryNav;
            return (<NavMenuLauncherIcon_1.NavMenuLauncherIcon key={"" + (isPrimaryNav ? 'primary-nav-icon' : 'secondary-nav-icon')} style={style.navIcon} position={isPrimaryNav ? primaryMenuPosition : secondaryMenuPosition} onClick={isPrimaryNav ? toggleNav : toggleSecondaryNav}/>);
        };
        _this.renderNavMenu = function (isPrimaryNav) {
            var _a = _this.props, toggleNav = _a.toggleNav, primaryMenuPosition = _a.primaryMenuPosition, style = _a.style, secondaryMenuPosition = _a.secondaryMenuPosition, toggleSecondaryNav = _a.toggleSecondaryNav, onNavClose = _a.onNavClose;
            var menuPosition = isPrimaryNav ? primaryMenuPosition : secondaryMenuPosition;
            var navMenuClasses = "nav-menu " + menuPosition;
            var menuClosePosition = menuPosition === 'left' ? -100 : 100;
            var closeButtonClasses = 'fa fa-times highlight-on-hover ';
            closeButtonClasses += menuPosition === 'left' ? 'right' : 'left';
            var customStyle = style[isPrimaryNav ? 'primaryNav' : 'secondaryNav'] || {};
            return (<react_motion_1.Motion style={{ x: react_motion_1.spring(_this.props[isPrimaryNav ? 'open' : 'secondaryNavOpen'] ? 0 : menuClosePosition) }} key={isPrimaryNav ? 'primary-nav' : 'secondary-nav'}>
                {function (_a) {
                var x = _a.x;
                return <div className={navMenuClasses} style={[
                    { WebkitTransform: "translate3d(" + x + "%, 0, 0)", transform: "translate3d(" + x + "%, 0, 0)" },
                    customStyle,
                ]}>
                            <i className={closeButtonClasses} onClick={isPrimaryNav ? (onNavClose || toggleNav) : toggleSecondaryNav}/>
                            {_this[isPrimaryNav ? 'primaryNav' : 'secondaryNav']}
                    </div>;
            }}
            </react_motion_1.Motion>);
        };
        _this.header = _this.footer = _this.content = <div></div>;
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
    HeaderFooterLayoutImpl.prototype.componentWillMount = function () {
        if (this.isNavBarPresent && !this.props.primaryMenuPosition) {
            throw new Error('The prop primaryMenuPosition has not been defined.');
        }
    };
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
        // Maximum of two navigation drawer should be rendered.
        if (++this.navMenuCount <= 2) {
            if (this.navMenuCount === 2) {
                this.isSecondaryNavBarPresent = true;
                this.secondaryNav = NavImpl;
            }
            else {
                this.isNavBarPresent = true;
                this.primaryNav = NavImpl;
            }
        }
    };
    HeaderFooterLayoutImpl.prototype.render = function () {
        var style = this.props.style;
        return (<div>
                {this.isNavBarPresent && this.renderNavMenu(true)}
                {this.isSecondaryNavBarPresent && this.renderNavMenu(false)}
                <div className="header" style={style.header}>
                    {this.isNavBarPresent && this.renderNavMenuLauncherIcon(true)}
                    {this.isSecondaryNavBarPresent && this.renderNavMenuLauncherIcon(false)}
                    {this.header}
                </div>
                <div className="content" style={style.content}>
                    {this.content}
                </div>
                <div className="footer" style={style.footer}>
                    {this.footer}
                </div>
            </div>);
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
