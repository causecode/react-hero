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
var react_router_dom_1 = require("react-router-dom");
var Widgets_1 = require("../components/Widgets/Widgets");
var HeaderFooterLayout_1 = require("../components/HeaderFooterLayout");
var ResponsiveView_1 = require("../components/ResponsiveView");
var ListPage_1 = require("../components-stateful/ListPage");
var ShowPage_1 = require("../components-stateful/ShowPage");
var EditPage_1 = require("../components-stateful/EditPage");
var ErrorPage_1 = require("../components/ErrorPage");
var constants_1 = require("../constants");
var HeaderFooterLayout_2 = require("../components/HeaderFooterLayout");
require('../init');
var headerFooterLayoutStyles = {
    header: {
        padding: 'none',
    },
    primaryNav: {
        padding: 'none',
        width: '30%',
        backgroundColor: '#eea303',
    },
    secondaryNav: {
        padding: 'none',
        width: '50%',
    },
    content: {
        color: '#888',
    },
    footer: {
        backgroundColor: '#888',
        fontSize: '15px',
        color: 'white',
    },
    navIcon: {
        color: '#777',
    },
};
var NewPage = (function (_super) {
    __extends(NewPage, _super);
    function NewPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewPage.prototype.render = function () {
        return (React.createElement(HeaderFooterLayout_1.HeaderFooterLayout, { primaryMenuPosition: "left", secondaryMenuPosition: "right", style: headerFooterLayoutStyles },
            React.createElement(HeaderFooterLayout_2.HeaderView, null,
                React.createElement(Widgets_1.Content, null,
                    React.createElement(Widgets_1.Title, null, "New App"),
                    React.createElement(Widgets_1.ButtonList, { highlightOnHover: true },
                        React.createElement(Widgets_1.ButtonListItem, null,
                            React.createElement(react_router_dom_1.Link, { to: "/" }, "Home"),
                            " "),
                        React.createElement(Widgets_1.ButtonListItem, null,
                            React.createElement(react_router_dom_1.Link, { to: "/page2" }, "Button 2")),
                        React.createElement(Widgets_1.ButtonListItem, null,
                            React.createElement(react_router_dom_1.Link, { to: "/resp" }, "Responsive View Page")),
                        React.createElement(Widgets_1.ButtonListItem, null,
                            React.createElement(react_router_dom_1.Link, { to: "/blog/list" }, "Blog List")),
                        React.createElement(Widgets_1.ButtonListItem, null,
                            React.createElement(react_router_dom_1.Link, { to: "/user/list" }, "User List"))))),
            React.createElement(HeaderFooterLayout_2.ContentView, null,
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: HomeContent }),
                    React.createElement(react_router_dom_1.Route, { path: "/page2", component: Page2Content }),
                    React.createElement(react_router_dom_1.Route, { path: "/resp", component: ContentImpl }),
                    React.createElement(react_router_dom_1.Route, { path: "/:resource/list", component: ListPage_1.ListPage }),
                    React.createElement(react_router_dom_1.Route, { path: "/:resource/create", component: EditPage_1.EditPage }),
                    React.createElement(react_router_dom_1.Route, { path: "/:resource/show/:resourceID", component: ShowPage_1.ShowPage }),
                    React.createElement(react_router_dom_1.Route, { path: "/:resource/edit/:resourceID", component: EditPage_1.EditPage }),
                    React.createElement(react_router_dom_1.Route, { render: function () { return React.createElement(ErrorPage_1.ErrorPage, { message: constants_1.PAGE_NOT_FOUND }); } }))),
            React.createElement(HeaderFooterLayout_2.FooterView, null, "my footer"),
            React.createElement(HeaderFooterLayout_2.NavigationMenu, null,
                React.createElement(Widgets_1.Content, null,
                    React.createElement(Widgets_1.Title, null, "This is the primary nav-menu"),
                    React.createElement(Widgets_1.Description, null, "This is the description"),
                    React.createElement(Widgets_1.ButtonList, { highlightOnHover: true },
                        React.createElement(Widgets_1.ButtonListItem, null,
                            React.createElement(react_router_dom_1.Link, { to: "/" }, "Home")),
                        React.createElement(Widgets_1.ButtonListItem, null,
                            React.createElement(react_router_dom_1.Link, { to: "/page2" }, "Button 2")),
                        React.createElement(Widgets_1.ButtonListItem, null,
                            React.createElement(react_router_dom_1.Link, { to: "/resp" }, "Responsive View Page"))))),
            React.createElement(HeaderFooterLayout_2.NavigationMenu, null,
                React.createElement(Widgets_1.Content, null,
                    React.createElement(Widgets_1.Title, null, "This is the secondary nav-menu"),
                    React.createElement(Widgets_1.Description, null, "This is the description"),
                    React.createElement(Widgets_1.ButtonList, { highlightOnHover: true },
                        React.createElement(Widgets_1.ButtonListItem, null,
                            React.createElement(react_router_dom_1.Link, { to: "/" }, "Home")),
                        React.createElement(Widgets_1.ButtonListItem, null,
                            React.createElement(react_router_dom_1.Link, { to: "/page2" }, "Button 2")),
                        React.createElement(Widgets_1.ButtonListItem, null,
                            React.createElement(react_router_dom_1.Link, { to: "/resp" }, "Responsive View Page")))))));
    };
    return NewPage;
}(React.Component));
exports.NewPage = NewPage;
var UserEditPage = (function (_super) {
    __extends(UserEditPage, _super);
    function UserEditPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserEditPage.prototype.render = function () {
        return (React.createElement("h1", null, "Test"));
    };
    return UserEditPage;
}(React.Component));
var HomeContent = (function (_super) {
    __extends(HomeContent, _super);
    function HomeContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomeContent.prototype.renderDefault = function () {
        return React.createElement("h1", { style: { height: '30em' } }, "This is the home page");
    };
    return HomeContent;
}(ResponsiveView_1.ResponsiveView));
exports.HomeContent = HomeContent;
var Page2Content = (function (_super) {
    __extends(Page2Content, _super);
    function Page2Content() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Page2Content.prototype.renderDefault = function () {
        return React.createElement("h1", { style: { height: '30em' } }, "Just Another Page!!");
    };
    return Page2Content;
}(ResponsiveView_1.ResponsiveView));
exports.Page2Content = Page2Content;
var ContentImpl = (function (_super) {
    __extends(ContentImpl, _super);
    function ContentImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContentImpl.prototype.renderDefault = function () {
        return (React.createElement("h1", null, "This is the default Content"));
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
//# sourceMappingURL=testImplementations.js.map