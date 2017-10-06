jest.unmock('../../src/components/common/KeywordMatcher');

import * as React from 'react';
import {ReactWrapper, mount, EnzymePropSelector} from 'enzyme';
import {KeywordMatcher, IKeywordMatcherProps, IKeywordMatcherState} from '../../src/components/common/KeywordMatcher';

const unroll = require<any>('unroll');
unroll.use(it);

document.getElementsByTagName = jest.fn(() => {
    return {
        keywords: {
            content: 'causecode, technology, love to code',
        },
    };
});

describe('Test cases for KeywordMatcher component', (): void => {

    describe('When keyword is matched', (): void => {
        let keywordMatcher: ReactWrapper<IKeywordMatcherProps, IKeywordMatcherState> =
            mount<IKeywordMatcherProps, IKeywordMatcherState> (
                <KeywordMatcher match="causecode">
                    <h1>
                        This will be rendered as match found in keywords.
                    </h1>
                </KeywordMatcher>
            );

        unroll('it should render #elementName #count times', (
            done: () => void,
            args: {elementName: string, element: EnzymePropSelector, count: number}
        ): void => {
            expect(keywordMatcher.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count'],
            ['div', 'div', 1],
            ['h1', 'h1', 1],
        ]);
    });

    describe('When keyword is not matched', (): void => {
        let keywordMatcher: ReactWrapper<IKeywordMatcherProps, IKeywordMatcherState> =
            mount<IKeywordMatcherProps, IKeywordMatcherState> (
                <KeywordMatcher match="apples">
                    <h1>
                        This will not get rendered.
                    </h1>
                </KeywordMatcher>
            );

        unroll('it should render #elementName #count times', (
            done: () => void,
            args: {elementName: string, element: EnzymePropSelector, count: number}
        ): void => {
            expect(keywordMatcher.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count'],
            ['div', 'div', 0],
            ['h1', 'h1', 0],
        ]);
    });

});
