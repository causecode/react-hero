/// <reference types="react" />
import * as React from 'react';
export interface IKeywordMatcherProps {
    match: string | string[];
}
export interface IKeywordMatcherState {
    keywords: string[];
}
export declare class KeywordMatcher extends React.Component<IKeywordMatcherProps, IKeywordMatcherState> {
    constructor();
    extractKeyword: () => string[];
    componentDidMount(): void;
    render(): JSX.Element;
}
