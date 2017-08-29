"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/widgets');
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var widgets_1 = require("../src/components/widgets");
var initializeTestCase_1 = require("./../src/utils/initializeTestCase");
var Wrapper_1 = require("./../src/components/Wrapper");
var unroll = require('unroll');
unroll.use(it);
describe('Test widgets', function () {
    var renderer;
    beforeEach(function () {
        var data = initializeTestCase_1.initializeTestCase();
        renderer = data.renderer;
    });
    describe('Test Title', function () {
        unroll('renders a #title', function (done, testArgs) {
            var widget = TestUtils.renderIntoDocument(<Wrapper_1.Wrapper>
                    {testArgs.widgetContent}
                </Wrapper_1.Wrapper>);
            expect(widget).toBeTruthy();
            expect(TestUtils.scryRenderedDOMComponentsWithClass(widget, 'highlight').length)
                .toEqual(testArgs.highlightItems);
            expect(TestUtils.scryRenderedDOMComponentsWithClass(widget, 'highlight-on-hover').length)
                .toEqual(testArgs.highlightOnHoverItems);
            var innerDiv = TestUtils
                .findRenderedDOMComponentWithClass(widget, testArgs.contentClass);
            expect(innerDiv).toBeTruthy();
            expect(innerDiv.textContent).toEqual(testArgs.textContent);
            done();
        }, [
            ['title', 'widgetContent', 'contentClass', 'textContent', 'highlightItems', 'highlightOnHoverItems'],
            ['Title with children', <widgets_1.Title>New Title</widgets_1.Title>, 'title', 'New Title', 0, 0],
            ['Title without children', <widgets_1.Title />, 'title', '', 0, 0],
            ['Content with Children', <widgets_1.Content>New Content</widgets_1.Content>, 'widget-content', 'New Content', 0, 0],
            ['Content without Children', <widgets_1.Content />, 'widget-content', '', 0, 0],
            ['Description with Children', <widgets_1.Description>New Description</widgets_1.Description>, 'description', 'New Description',
                0, 0],
            ['Description without Children', <widgets_1.Description />, 'description', '', 0, 0],
            ['ButtonList with Children', <widgets_1.ButtonList>Buttons</widgets_1.ButtonList>, 'button-list', 'Buttons', 0, 0],
            ['ButtonList with highlightOnHover', <widgets_1.ButtonList highlightOnHover={true}>Buttons</widgets_1.ButtonList>,
                'button-list', 'Buttons', 1, 0],
            ['ButtonList without Children', <widgets_1.ButtonList />, 'button-list', '', 0, 0],
            ['ButtonListItem with Children', <widgets_1.ButtonListItem>Button</widgets_1.ButtonListItem>, 'button-list-item', 'Button',
                0, 0],
            ['ButtonListItem with highlightOnHover', <widgets_1.ButtonListItem highlightOnHover={true}>Button</widgets_1.ButtonListItem>,
                'button-list-item', 'Button', 0, 1],
            ['ButtonListItem without Children', <widgets_1.ButtonListItem />, 'button-list-item', '', 0, 0]
        ]);
    });
});
