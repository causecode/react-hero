jest.unmock('../../src/components/common/KeywordMatcher');

import * as React from 'react';
import {ReactWrapper, mount} from 'enzyme';
import {KeywordMatcher, IKeywordMatcherProps, IKeywordMatcherState} from '../../src/components/common/KeywordMatcher';

const unroll = require<any>('unroll');
unroll.use(it);

interface IMeta {
    keywords?: { content: string };
    random?: { content: string };
}

document.getElementsByTagName = jest.fn((): IMeta => {
        return {
            keywords: {
                content: 'causecode, technology, love to code',
            },
        };
    })
    .mockImplementationOnce((): IMeta => {
        return [];
    })
    .mockImplementationOnce((): IMeta => {
        return {
            random: {
                content: 'any random content',
            },
        };
    })
;

describe('Test cases for KeywordMatcher component', (): void => {

    describe('When meta is empty', (): void => {
        const keywordMatcher: ReactWrapper<IKeywordMatcherProps, IKeywordMatcherState> =
                mount<IKeywordMatcherProps, IKeywordMatcherState> (
                    <KeywordMatcher match="causecode">
                        <h1>
                            This will not get rendered.
                        </h1>
                    </KeywordMatcher>
                );

        unroll('it should render #elementName 0 times', (
                done: () => void,
                args: {elementName: string}
        ): void => {
            expect(keywordMatcher.find(args.elementName).length).toBe(0);
            done();
        }, [
            ['elementName'],
            ['div'],
            ['h1'],
        ]);
    });

    describe('When meta is present but does not contain keywords', (): void => {
        const keywordMatcher: ReactWrapper<IKeywordMatcherProps, IKeywordMatcherState> =
                mount<IKeywordMatcherProps, IKeywordMatcherState> (
                    <KeywordMatcher match="causecode">
                        <h1>
                            This will not get rendered.
                        </h1>
                    </KeywordMatcher>
                );

        unroll('it should render #elementName 0 times', (
                done: () => void,
                args: {elementName: string}
        ): void => {
            expect(keywordMatcher.find(args.elementName).length).toBe(0);
            done();
        }, [
            ['elementName'],
            ['div'],
            ['h1'],
        ]);
    });

    describe('When meta is present and contains keywords', (): void => {

        describe('When match prop is a string and is present in keywords', (): void => {
            const keywordMatcher: ReactWrapper<IKeywordMatcherProps, IKeywordMatcherState> =
                    mount<IKeywordMatcherProps, IKeywordMatcherState> (
                        <KeywordMatcher match="causecode">
                            <h1>
                                This will be rendered as match found in keywords.
                            </h1>
                        </KeywordMatcher>
                    );

            unroll('it should render #elementName 1 times', (
                    done: () => void,
                    args: {elementName: string}
            ): void => {
                expect(keywordMatcher.find(args.elementName).length).toBe(1);
                done();
            }, [
                ['elementName'],
                ['div'],
                ['h1'],
            ]);
        });

        describe('When match prop is a string and is not present in keywords', (): void => {
            const keywordMatcher: ReactWrapper<IKeywordMatcherProps, IKeywordMatcherState> =
                    mount<IKeywordMatcherProps, IKeywordMatcherState> (
                        <KeywordMatcher match="apples">
                            <h1>
                                This will not get rendered.
                            </h1>
                        </KeywordMatcher>
                    );

            unroll('it should render #elementName 0 times', (
                    done: () => void,
                    args: {elementName: string}
            ): void => {
                expect(keywordMatcher.find(args.elementName).length).toBe(0);
                done();
            }, [
                ['elementName'],
                ['div'],
                ['h1'],
            ]);
        });

        describe('When match prop is an array and present in keywords', (): void => {
            const keywordMatcher: ReactWrapper<IKeywordMatcherProps, IKeywordMatcherState> =
                    mount<IKeywordMatcherProps, IKeywordMatcherState> (
                        <KeywordMatcher match={['causecode', 'keyword']}>
                            <h1>
                                This will be rendered as match found in keywords.
                            </h1>
                        </KeywordMatcher>
                    );

            unroll('it should render #elementName 1 times', (
                    done: () => void,
                    args: {elementName: string}
            ): void => {
                expect(keywordMatcher.find(args.elementName).length).toBe(1);
                done();
            }, [
                ['elementName'],
                ['div'],
                ['h1'],
            ]);
        });

        describe('When match prop is an array and not present in keywords', (): void => {
            const keywordMatcher: ReactWrapper<IKeywordMatcherProps, IKeywordMatcherState> =
                    mount<IKeywordMatcherProps, IKeywordMatcherState> (
                        <KeywordMatcher match={['apples', 'oranges']}>
                            <h1>
                                This will not get rendered.
                            </h1>
                        </KeywordMatcher>
                    );

            unroll('it should render #elementName 0 times', (
                    done: () => void,
                    args: {elementName: string}
            ): void => {
                expect(keywordMatcher.find(args.elementName).length).toBe(0);
                done();
            }, [
                ['elementName'],
                ['div'],
                ['h1'],
            ]);
        });

    });

});
