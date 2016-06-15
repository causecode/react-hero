"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var NavMenuLauncherIcon_1 = require('./NavMenuLauncherIcon');
var react_motion_1 = require('react-motion');
var store_1 = require("../store");
var Actions = require("./common/actions/actions");
var connect = require('react-redux').connect;
require("../../styles/index.css");
require("bootstrap/dist/css/bootstrap.min.css");
require("font-awesome/css/font-awesome.min.css");
var HeaderView = (function (_super) {
    __extends(HeaderView, _super);
    function HeaderView() {
        _super.apply(this, arguments);
    }
    HeaderView.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return HeaderView;
}(React.Component));
exports.HeaderView = HeaderView;
var FooterView = (function (_super) {
    __extends(FooterView, _super);
    function FooterView() {
        _super.apply(this, arguments);
    }
    FooterView.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return FooterView;
}(React.Component));
exports.FooterView = FooterView;
var ContentView = (function (_super) {
    __extends(ContentView, _super);
    function ContentView() {
        _super.apply(this, arguments);
    }
    ContentView.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return ContentView;
}(React.Component));
exports.ContentView = ContentView;
var NavigationMenu = (function (_super) {
    __extends(NavigationMenu, _super);
    function NavigationMenu() {
        _super.apply(this, arguments);
    }
    NavigationMenu.prototype.render = function () {
        return React.createElement("div", null, this.props.children);
    };
    return NavigationMenu;
}(React.Component));
exports.NavigationMenu = NavigationMenu;
var HeaderFooterLayoutImpl = (function (_super) {
    __extends(HeaderFooterLayoutImpl, _super);
    function HeaderFooterLayoutImpl(props) {
        _super.call(this);
        this.isNavBarPresent = false;
        this.toggleNav = function () {
            store_1.store.dispatch(Actions.toggleNav());
        };
        this.header = this.footer = this.content = React.createElement("div", null);
        this.state = { open: false };
        if (props.children) {
            for (var _i = 0, _a = props.children; _i < _a.length; _i++) {
                var child = _a[_i];
                switch (child.type.name) {
                    case 'HeaderView':
                        this.header = child;
                        break;
                    case 'ContentView':
                        this.content = child;
                        break;
                    case 'FooterView':
                        this.footer = child;
                        break;
                    case 'NavigationMenu':
                        this.setNav(child);
                        break;
                }
            }
        }
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
    HeaderFooterLayoutImpl.prototype.render = function () {
        var _this = this;
        var navMenuClasses = "nav-menu " + this.props.menuPosition;
        var menuClosePosition = (this.props.menuPosition === 'left') ? -100 : 100;
        var closeButtonClasses = 'fa fa-times highlight-on-hover ';
        closeButtonClasses += (this.props.menuPosition === 'left') ? 'right' : 'left';
        return (React.createElement("div", null, React.createElement(react_motion_1.Motion, {style: { x: react_motion_1.spring(this.props.open ? 0 : menuClosePosition) }}, function (_a) {
            var x = _a.x;
            return React.createElement("div", {className: navMenuClasses, style: { WebkitTransform: "translate3d(" + x + "%, 0, 0)", transform: "translate3d(" + x + "%, 0, 0)", }}, React.createElement("i", {className: closeButtonClasses, onClick: _this.toggleNav}), _this.nav);
        }), React.createElement("div", {className: "header"}, (function () {
            if (_this.isNavBarPresent) {
                return (React.createElement(NavMenuLauncherIcon_1.NavMenuLauncherIcon, {position: "" + _this.props.menuPosition, onClick: _this.toggleNav}));
            }
        })(), this.header), React.createElement("div", {className: "content"}, this.content), React.createElement("div", {className: "footer"}, this.footer)));
    };
    return HeaderFooterLayoutImpl;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        open: state.open
    };
};
var HeaderFooterLayout = connect(mapStateToProps)(HeaderFooterLayoutImpl);
exports.HeaderFooterLayout = HeaderFooterLayout;
//# sourceMappingURL=HeaderFooterLayout.js.map