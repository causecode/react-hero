jest.unmock('../src/components/HeaderFooterLayout');

import * as TestUtils from 'react-addons-test-utils';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {HeaderFooterLayoutImpl} from '../src/components/HeaderFooterLayout';
import {NavMenuLauncherIcon} from '../src/components/NavMenuLauncherIcon';
import {Provider, connect} from 'react-redux';
import {ReactComponent} from 'react-router';
import IMockStore from '../src/store';
import {store} from '../src/store';
import {
    HeaderFooterLayout,
    NavigationMenu,
    HeaderView,
    FooterView,
    ContentView
} from '../src/components/HeaderFooterLayout';

const store = require.requireActual<IMockStore>('../src/store/store');

describe('Test HeaderFooterLayout', () => {

    it('renders a simple HeaderFooterLayout in the DOM', () => {
        let layout: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
            <Provider store={store}>
                <HeaderFooterLayout/>
            </Provider>
        );

        expect(TestUtils.isCompositeComponent(layout)).toBeTruthy();
        ['header', 'content', 'footer']
            .forEach((className) => {
                expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, className).length).toBeTruthy();
            });
        expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, 'nav-menu').length).toBeFalsy();
    });

    it('renders a HeaderFooterLayout with NavigationMenu', () => {
        let layout: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
            <Provider store={store}>
                <HeaderFooterLayout menuPosition="left">
                    <HeaderView><div className="header-content"></div></HeaderView>
                    <ContentView><div className="content-content"></div></ContentView>
                    <FooterView><div className="footer-content"></div></FooterView>
                    <NavigationMenu><div className="nav-menu-content"></div></NavigationMenu>
                </HeaderFooterLayout>
            </Provider>
        );
        let getRenderedDOM = (tree) => ReactDOM.findDOMNode(tree);
        let header: HTMLElement[] = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'header') as HTMLElement[];
        let content: HTMLElement[] = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'content') as HTMLElement[];
        let footer: HTMLElement[] = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'footer') as HTMLElement[];
        let nav: HTMLElement[] = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'nav-menu') as HTMLElement[];

        ['header-content', 'content-content', 'footer-content', 'nav-menu-content'].forEach((contentClass) => {
            expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, contentClass).length).toBe(1);
        });

        [header[0], content[0], footer[0], nav[0]].forEach((component) => {
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

        let navMenuLauncher = getRenderedDOM(header[0]).querySelector('span.burger-icon');
        expect(navMenuLauncher).toBeTruthy();

        TestUtils.Simulate.click(navMenuLauncher);

        expect(store.getActions()[0].type).toEqual('TOGGLE_NAV');
    });

    it('renders a HeaderFooterLayout with menuPosition undefined but Navigation Menu Defined', () => {
        let layout: React.DOMElement<{}, {}> =
            <Provider store={store}>
                <HeaderFooterLayout>
                    <NavigationMenu>this is  a navigation menu</NavigationMenu>
                </HeaderFooterLayout>
            </Provider>;

        expect(() => { TestUtils.renderIntoDocument(layout); })
            .toThrow(new Error('The prop menuPosition has not been defined.'));

    });

    it('renders a HeaderFooterLayout with only the Header and NavigationMenu', () => {
        HeaderFooterLayoutImpl.prototype.setNav =
                jest.fn<typeof HeaderFooterLayoutImpl.prototype.setNav>(HeaderFooterLayoutImpl.prototype.setNav);
        let navMenuContent: JSX.Element = <div className="nav-menu-content">NavMenu</div>;
        let headerContent: JSX.Element = <div className="header-content">Header</div>;
        let layout: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
            <Provider store={store} >
                <HeaderFooterLayout menuPosition="left">
                    <HeaderView>{headerContent}></HeaderView>
                    <NavigationMenu>{navMenuContent}</NavigationMenu>
                </HeaderFooterLayout>
            </Provider>
        );
        expect(layout).toBeTruthy();

        let header: HTMLElement = TestUtils.findRenderedDOMComponentWithClass(layout, 'header') as HTMLElement;
        let navMenu: HTMLElement = TestUtils.findRenderedDOMComponentWithClass(layout, 'nav-menu') as HTMLElement;

        [header, navMenu].forEach((element: HTMLElement): void => {
            expect(element).toBeTruthy();
            expect(element.children.length).toEqual(2);
        });
    });

});
