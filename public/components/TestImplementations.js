"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var HeaderFooterLayout_1 = require('./HeaderFooterLayout');
var ResponsiveView_1 = require('./ResponsiveView');
var Widgets_1 = require('./Widgets');
var react_router_1 = require('react-router');
var react_router_2 = require('react-router');
var NewPage = (function (_super) {
    __extends(NewPage, _super);
    function NewPage() {
        _super.call(this);
    }
    NewPage.prototype.render = function () {
        return (React.createElement(HeaderFooterLayout_1.HeaderFooterLayout, {fixedHeader: true, menuPosition: 'right'}, React.createElement(HeaderFooterLayout_1.HeaderView, null, React.createElement(Widgets_1.Content, null, React.createElement(Widgets_1.Title, null, "New App"), React.createElement(Widgets_1.ButtonList, {highlightOnHover: true}, React.createElement(Widgets_1.ButtonListItem, null, React.createElement(react_router_1.Link, {to: "/"}, "Home"), " "), React.createElement(Widgets_1.ButtonListItem, null, React.createElement(react_router_1.Link, {to: "/page2"}, "Button 2")), React.createElement(Widgets_1.ButtonListItem, null, React.createElement(react_router_1.Link, {to: "/resp"}, "Responsive View Page"))))), React.createElement(HeaderFooterLayout_1.ContentView, null, React.createElement(react_router_1.Router, {history: react_router_2.browserHistory}, React.createElement(react_router_1.Route, {path: "/", component: HomeContent}), React.createElement(react_router_1.Route, {path: "/page2", component: Page2Content}), React.createElement(react_router_1.Route, {path: "/resp", component: ContentImpl}))), React.createElement(HeaderFooterLayout_1.FooterView, null, "my footer"), React.createElement(HeaderFooterLayout_1.NavigationMenu, null, React.createElement(Widgets_1.Content, null, React.createElement(Widgets_1.Title, null, "This is the nav-mnu"), React.createElement(Widgets_1.Description, null, "This is the description"), React.createElement(Widgets_1.ButtonList, {highlightOnHover: true}, React.createElement(Widgets_1.ButtonListItem, null, React.createElement(react_router_1.Link, {to: "/"}, "Home")), React.createElement(Widgets_1.ButtonListItem, null, React.createElement(react_router_1.Link, {to: "/page2"}, "Button 2")), React.createElement(Widgets_1.ButtonListItem, null, React.createElement(react_router_1.Link, {to: "/resp"}, "Responsive View Page")))))));
    };
    return NewPage;
}(React.Component));
exports.NewPage = NewPage;
var HomeContent = (function (_super) {
    __extends(HomeContent, _super);
    function HomeContent() {
        _super.apply(this, arguments);
    }
    HomeContent.prototype.renderDefault = function () {
        return React.createElement("h1", {style: { height: '30em' }}, "This is the home page");
    };
    return HomeContent;
}(ResponsiveView_1.ResponsiveView));
exports.HomeContent = HomeContent;
var Page2Content = (function (_super) {
    __extends(Page2Content, _super);
    function Page2Content() {
        _super.apply(this, arguments);
    }
    Page2Content.prototype.renderDefault = function () {
        return React.createElement("h1", {style: { height: '30em' }}, "Just Another Page!!");
    };
    return Page2Content;
}(ResponsiveView_1.ResponsiveView));
exports.Page2Content = Page2Content;
var ContentImpl = (function (_super) {
    __extends(ContentImpl, _super);
    function ContentImpl() {
        _super.call(this);
    }
    ContentImpl.prototype.renderDefault = function () {
        return (React.createElement("h1", null, "THis is the default Content"));
    };
    ContentImpl.prototype.renderMobile = function () {
        return (React.createElement("h1", null, "This is the mobile Content"));
    };
    ContentImpl.prototype.renderMobilePortrait = function () {
        return (React.createElement("h1", null, "This is the Mobile Portrait Content"));
    };
    ContentImpl.prototype.renderTabletLandscape = function () {
        return (React.createElement("h1", null, "This is the tablet landscape content"));
    };
    return ContentImpl;
}(ResponsiveView_1.ResponsiveView));
exports.ContentImpl = ContentImpl;
//# sourceMappingURL=TestImplementations.js.map