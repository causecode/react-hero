import {FormControl} from 'react-bootstrap';
jest.unmock('../src/components/Widgets');
import {initializeTestCase} from './initializeTestCase';
import * as Widgets from '../src/components/Widgets';
import {IInitializerData} from './initializeTestCase';
import * as React from 'react';
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
import * as TestUtils from 'react-addons-test-utils';
import * as ReactDOM from 'react-dom';
import {Wrapper} from './Wrapper';

describe('Test Widgets', () => {
    let renderer: React.ShallowRenderer;

    beforeEach(() => {
        let data: IInitializerData = initializeTestCase();
        renderer = data.renderer;
    });

    describe('Test Title', () => {

        it('renders a Title Widget with children', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <Wrapper>
                <Widgets.Title>New Title</Widgets.Title>
                </Wrapper>
            );

            expect(widget).toBeTruthy();
            let innerDiv: Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'title');
            expect(innerDiv).toBeTruthy();
            expect(innerDiv.textContent).toEqual('New Title');

        });

        it('renders a Title Widget without children', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <Wrapper><Widgets.Title/></Wrapper>
            );

            expect(widget).toBeTruthy();
            let innerDiv: Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'title');
            expect(innerDiv).toBeTruthy();
            expect(innerDiv.textContent).toEqual('');
        });
    });

    describe('Test Content', () => {

        it('renders a Content Widget with children', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <Wrapper><Widgets.Content>New Content</Widgets.Content></Wrapper>
            );

            expect(widget).toBeTruthy();
            let innerDiv: Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'widget-content');
            expect(innerDiv).toBeTruthy();
            expect(innerDiv.textContent).toEqual('New Content');

        });

        it('renders a Content Widget without children', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <Wrapper><Widgets.Content/></Wrapper>
            );

            expect(widget).toBeTruthy();
            let innerDiv : Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'widget-content');
            expect(innerDiv).toBeTruthy();
            expect(innerDiv.textContent).toEqual('');
        });

    });

    describe('Test Description', () => {

        it('renders a Description Widget with children', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <Wrapper><Widgets.Description>New Description</Widgets.Description></Wrapper>
            );

            expect(widget).toBeTruthy();
            let innerDiv: Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'description');
            expect(innerDiv).toBeTruthy();
            expect(innerDiv.textContent).toEqual('New Description');

        });

        it('renders a Description Widget without children', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <Wrapper><Widgets.Description/></Wrapper>
            );

            expect(widget).toBeTruthy();
            let innerDiv: Element  = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'description');
            expect(innerDiv).toBeTruthy();
            expect(innerDiv.textContent).toEqual('');
        });

    });

    describe('Test ButtonList', () => {

        it('renders a ButtonList', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <Wrapper><Widgets.ButtonList>Buttons</Widgets.ButtonList></Wrapper>
            );

            expect(widget).toBeTruthy();
            expect(TestUtils.scryRenderedDOMComponentsWithClass(widget, 'highlight').length).toBeFalsy();
            let list: Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'button-list');
            expect(list).toBeTruthy();
            expect(list.textContent).toEqual('Buttons');

        });

        it('renders a ButtonList with a highlightOnHover prop', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <Wrapper><Widgets.ButtonList highlightOnHover={true}>Buttons</Widgets.ButtonList></Wrapper>
            );

            expect(widget).toBeTruthy();
            expect(TestUtils.scryRenderedDOMComponentsWithClass(widget, 'highlight').length).toBeTruthy();
            let list: Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'button-list');
            expect(list).toBeTruthy();
            expect(list.textContent).toEqual('Buttons');
        });

        it('renders a ButtonList without any props or children', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
               <Wrapper> <Widgets.ButtonList/></Wrapper>
            );

            expect(widget).toBeTruthy();
            expect(TestUtils.scryRenderedDOMComponentsWithClass(widget, 'highlight').length).toBeFalsy();
            let list: Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'button-list');
            expect(list).toBeTruthy();
            expect(list.textContent).toEqual('');
        });

    });

    describe('Test ButtonListItem', () => {

        it('renders a ButtonListItem', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <Wrapper><Widgets.ButtonListItem>Buttons</Widgets.ButtonListItem></Wrapper>
            );

            expect(widget).toBeTruthy();
            expect(TestUtils.scryRenderedDOMComponentsWithClass(widget, 'highlight-on-hover').length).toBeFalsy();
            let list: Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'button-list-item');
            expect(list).toBeTruthy();
            expect(list.textContent).toEqual('Buttons');

        });

        it('renders a ButtonListItem with a highlightOnHover prop', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <Wrapper><Widgets.ButtonListItem highlightOnHover={true}>Buttons</Widgets.ButtonListItem></Wrapper>
            );

            expect(widget).toBeTruthy();
            expect(TestUtils.scryRenderedDOMComponentsWithClass(widget, 'highlight-on-hover').length).toBeTruthy();
            let list: Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'button-list-item');
            expect(list).toBeTruthy();
            expect(list.textContent).toEqual('Buttons');
        });

        it('renders a ButtonListItem without any props or children', () => {
            let widget: React.Component<{}, {}> = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
                <Wrapper><Widgets.ButtonListItem/></Wrapper>
            );

            expect(widget).toBeTruthy();
            expect(TestUtils.scryRenderedDOMComponentsWithClass(widget, 'highlight-on-hover').length).toBeFalsy();
            let list: Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, 'button-list-item');
            expect(list).toBeTruthy();
            expect(list.textContent).toEqual('');
        });

    });

});
