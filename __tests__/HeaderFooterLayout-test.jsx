"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/HeaderFooterLayout');
var TestUtils = require("react-addons-test-utils");
var ReactDOM = require("react-dom");
var React = require("react");
var HeaderFooterLayout_1 = require("../src/components/HeaderFooterLayout");
var react_redux_1 = require("react-redux");
var store_1 = require("../src/store");
var HeaderFooterLayout_2 = require("../src/components/HeaderFooterLayout");
var store = require.requireActual('../src/store/store');
describe('Test HeaderFooterLayout', function () {
    it('renders a simple HeaderFooterLayout in the DOM', function () {
        var layout = TestUtils.renderIntoDocument(<react_redux_1.Provider store={store_1.store}>
                <HeaderFooterLayout_2.HeaderFooterLayout />
            </react_redux_1.Provider>);
        expect(TestUtils.isCompositeComponent(layout)).toBeTruthy();
        ['header', 'content', 'footer']
            .forEach(function (className) {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, className).length).toBeTruthy();
        });
        expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, 'nav-menu').length).toBeFalsy();
    });
    it('renders a HeaderFooterLayout with NavigationMenu', function () {
        var layout = TestUtils.renderIntoDocument(<react_redux_1.Provider store={store_1.store}>
                <HeaderFooterLayout_2.HeaderFooterLayout menuPosition="left">
                    <HeaderFooterLayout_2.HeaderView><div className="header-content"></div></HeaderFooterLayout_2.HeaderView>
                    <HeaderFooterLayout_2.ContentView><div className="content-content"></div></HeaderFooterLayout_2.ContentView>
                    <HeaderFooterLayout_2.FooterView><div className="footer-content"></div></HeaderFooterLayout_2.FooterView>
                    <HeaderFooterLayout_2.NavigationMenu><div className="nav-menu-content"></div></HeaderFooterLayout_2.NavigationMenu>
                </HeaderFooterLayout_2.HeaderFooterLayout>
            </react_redux_1.Provider>);
        var getRenderedDOM = function (tree) { return ReactDOM.findDOMNode(tree); };
        var header = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'header');
        var content = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'content');
        var footer = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'footer');
        var nav = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'nav-menu');
        ['header-content', 'content-content', 'footer-content', 'nav-menu-content'].forEach(function (contentClass) {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, contentClass).length).toBe(1);
        });
        [header[0], content[0], footer[0], nav[0]].forEach(function (component) {
            expect(component).toBeTruthy();
        });
        expect(TestUtils.isCompositeComponent(layout)).toBeTruthy();
        expect(header[0].children.length).toBe(2);
        expect(content[0].children.length).toBe(1);
        expect(footer[0].children.length).toBe(1);
        expect(nav[0].children.length).toBe(2);
        expect(getRenderedDOM(header[0]).querySelector('div.header-content')).toBeTruthy();
        expect(getRenderedDOM(content[0]).querySelector('div.content-content')).toBeTruthy();
        expect(getRenderedDOM(footer[0]).querySelector('div.footer-content')).toBeTruthy();
        expect(getRenderedDOM(nav[0]).querySelector('div.nav-menu-content')).toBeTruthy();
        var navMenuLauncher = getRenderedDOM(header[0]).querySelector('span.burger-icon');
        expect(navMenuLauncher).toBeTruthy();
        TestUtils.Simulate.click(navMenuLauncher);
        expect(store_1.store.getActions()[0].type).toEqual('TOGGLE_NAV');
    });
    it('renders a HeaderFooterLayout with menuPosition undefined but Navigation Menu Defined', function () {
        var layout = <react_redux_1.Provider store={store_1.store}>
                <HeaderFooterLayout_2.HeaderFooterLayout>
                    <HeaderFooterLayout_2.NavigationMenu>this is  a navigation menu</HeaderFooterLayout_2.NavigationMenu>
                </HeaderFooterLayout_2.HeaderFooterLayout>
            </react_redux_1.Provider>;
        expect(function () { TestUtils.renderIntoDocument(layout); })
            .toThrow(new Error('The prop menuPosition has not been defined.'));
    });
    it('renders a HeaderFooterLayout with only the Header and NavigationMenu', function () {
        HeaderFooterLayout_1.HeaderFooterLayoutImpl.prototype.setNav =
            jest.fn(HeaderFooterLayout_1.HeaderFooterLayoutImpl.prototype.setNav);
        var navMenuContent = <div className="nav-menu-content">NavMenu</div>;
        var headerContent = <div className="header-content">Header</div>;
        var layout = TestUtils.renderIntoDocument(<react_redux_1.Provider store={store_1.store}>
                <HeaderFooterLayout_2.HeaderFooterLayout menuPosition="left">
                    <HeaderFooterLayout_2.HeaderView>{headerContent}></HeaderFooterLayout_2.HeaderView>
                    <HeaderFooterLayout_2.NavigationMenu>{navMenuContent}</HeaderFooterLayout_2.NavigationMenu>
                </HeaderFooterLayout_2.HeaderFooterLayout>
            </react_redux_1.Provider>);
        expect(layout).toBeTruthy();
        var header = TestUtils.findRenderedDOMComponentWithClass(layout, 'header');
        var navMenu = TestUtils.findRenderedDOMComponentWithClass(layout, 'nav-menu');
        [header, navMenu].forEach(function (element) {
            expect(element).toBeTruthy();
            expect(element.children.length).toEqual(2);
        });
    });
});
