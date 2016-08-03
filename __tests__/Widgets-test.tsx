import {FormControl} from 'react-bootstrap';
jest.unmock('../src/components/Widgets');
import {initializeTestCase} from './../src/utils/initializeTestCase';
import {Title, Content, ButtonList, ButtonListItem, Description} from '../src/components/Widgets';
import {IInitializerData} from './../src/utils/initializeTestCase';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import * as ReactDOM from 'react-dom';
import {Wrapper} from './../src/components/Wrapper';
import {IShallowTestUtils} from '../src/interfaces/interfaces';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test Widgets', () => {
    let renderer: React.ShallowRenderer;

    beforeEach(() => {
        let data: IInitializerData = initializeTestCase();
        renderer = data.renderer;
    });

    describe('Test Title', () => {

        unroll('renders a #title', (done, testArgs) => {
            let widget: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
                <Wrapper>
                    {testArgs.widgetContent}
                </Wrapper>
            );

            expect(widget).toBeTruthy();
            expect(TestUtils.scryRenderedDOMComponentsWithClass(widget, 'highlight').length)
                    .toEqual(testArgs.highlightItems);
            expect(TestUtils.scryRenderedDOMComponentsWithClass(widget, 'highlight-on-hover').length)
                    .toEqual(testArgs.highlightOnHoverItems);
            let innerDiv: Element = TestUtils
                    .findRenderedDOMComponentWithClass(widget, testArgs.contentClass);
            expect(innerDiv).toBeTruthy();
            expect(innerDiv.textContent).toEqual(testArgs.textContent);
            done();

        }, [
            ['title', 'widgetContent', 'contentClass', 'textContent', 'highlightItems', 'highlightOnHoverItems'],
            ['Title with children', <Title>New Title</Title>, 'title', 'New Title', 0, 0],
            ['Title without children', <Title/>, 'title', '', 0, 0],
            ['Content with Children', <Content>New Content</Content>, 'widget-content', 'New Content', 0, 0],
            ['Content without Children', <Content/>, 'widget-content', '', 0, 0],
            ['Description with Children', <Description>New Description</Description>, 'description', 'New Description'
                    , 0, 0],
            ['Description without Children', <Description/>, 'description', '', 0, 0],
            ['ButtonList with Children', <ButtonList>Buttons</ButtonList>, 'button-list', 'Buttons', 0, 0],
            ['ButtonList with highlightOnHover', <ButtonList highlightOnHover={true}>Buttons</ButtonList>
                    , 'button-list', 'Buttons', 1, 0],
            ['ButtonList without Children', <ButtonList/>, 'button-list', '', 0, 0],
            ['ButtonListItem with Children', <ButtonListItem>Button</ButtonListItem>, 'button-list-item', 'Button'
                    , 0, 0],
            ['ButtonListItem with highlightOnHover', <ButtonListItem highlightOnHover={true}>Button</ButtonListItem>
                    , 'button-list-item', 'Button', 0, 1],
            ['ButtonListItem without Children', <ButtonListItem/>, 'button-list-item', '', 0, 0],
        ]);

    });

});
