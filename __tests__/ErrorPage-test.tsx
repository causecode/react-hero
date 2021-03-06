jest.unmock('../src/components/ErrorPage');
import {ErrorPage} from '../src/components/ErrorPage';
import {Wrapper} from '../src/components/Wrapper';
import * as React from 'react';
import * as TestUtils from 'react-dom/test-utils';

it('should render ErrorPage correctly', () => {
    let testMessage: string = 'Error Message';
    let tree: React.Component<{message: string}, void> = TestUtils.renderIntoDocument
            <React.Component<{message: string}, void>>(
        <Wrapper>
            <ErrorPage message={testMessage}/>
        </Wrapper>
    );
    expect(tree.props.children.props.message).toEqual(testMessage);
    expect((TestUtils.scryRenderedDOMComponentsWithTag(tree, 'div')).length).toEqual(2);
    expect(TestUtils.findRenderedDOMComponentWithTag(tree, 'i')).toBeTruthy();
    expect(TestUtils.findRenderedDOMComponentWithTag(tree, 'span')).toBeTruthy();
});
