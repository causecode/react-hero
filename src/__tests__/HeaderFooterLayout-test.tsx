jest.unmock('../components/HeaderFooterLayout');
import HeaderFooterLayout , {
    NavigationMenu,
    HeaderView,
    FooterView,
    ContentView
} from '../components/HeaderFooterLayout';
import {ReactComponent} from 'react-router';
import * as TestUtils from 'react-addons-test-utils';
import * as React from 'react';
import {store} from '../store/store';
import {Provider, connect} from 'react-redux';
import * as ReactDOM from 'react-dom';

describe('Test HeaderFooterLayout', () => {

    it('renders a simple HeaderFooterLayout in the DOM', () => {
        let layout: any = TestUtils.renderIntoDocument<any>(
            <Provider store={store}>
                <HeaderFooterLayout>
                </HeaderFooterLayout>
            </Provider>
        );

        expect(TestUtils.isCompositeComponent(layout)).toBeTruthy();
        expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, 'header')[0]).toBeTruthy();
        expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, 'content')[0]).toBeTruthy();
        expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, 'footer')[0]).toBeTruthy();
        expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, 'nav-menu').length).toBe(0);
    });

    it('renders a HeaderFooterLayout with menuPosition undefined but Navigation Menu Defined', () => {
        let layout: any =
            <Provider store={store}>
                <HeaderFooterLayout>
                    <NavigationMenu>this is  a navigation menu</NavigationMenu>
                </HeaderFooterLayout>
            </Provider>;

        expect(() => { TestUtils.renderIntoDocument(layout); })
                .toThrow(new Error('The prop menuPosition has not been defined.'));

     });

    it('renders a HeaderFooterLayout with NavigationMenu', () => {
        let layout: any = TestUtils.renderIntoDocument(
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
        let header: any = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'header');
        let content: any = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'content');
        let footer: any = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'footer');
        let nav: any = TestUtils.scryRenderedDOMComponentsWithClass(layout, 'nav-menu');
        expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, 'header-content').length).toBe(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, 'content-content').length).toBe(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, 'footer-content').length).toBe(1);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(layout, 'nav-menu-content').length).toBe(1);

        expect(header[0]).toBeTruthy();
        expect(content[0]).toBeTruthy();
        expect(footer[0]).toBeTruthy();
        expect(nav[0]).toBeTruthy();

        expect(TestUtils.isCompositeComponent(layout)).toBeTruthy();
        expect(header[0].children.length).toBe(2);
        expect(content[0].children.length).toBe(1);
        expect(footer[0].children.length).toBe(1);
        expect(nav[0].children.length).toBe(2);

        expect(getRenderedDOM(header[0]).querySelector('div.header-content')).toBeTruthy();
        expect(getRenderedDOM(header[0]).querySelector('span.burger-icon')).toBeTruthy();
        expect(getRenderedDOM(content[0]).querySelector('div.content-content')).toBeTruthy();
        expect(getRenderedDOM(footer[0]).querySelector('div.footer-content')).toBeTruthy();
        expect(getRenderedDOM(nav[0]).querySelector('div.nav-menu-content')).toBeTruthy();
    });

});
