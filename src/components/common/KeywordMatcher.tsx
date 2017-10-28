import * as React from 'react';
import * as Radium from 'radium';
import {KEYWORDS} from '../../constants';

export interface IKeywordMatcherProps {
    match: string | string[];
}

export interface IKeywordMatcherState {
    keywords: string[];
}

@Radium
export class KeywordMatcher extends React.Component<IKeywordMatcherProps, IKeywordMatcherState> {

    constructor() {
        super();
        this.state = {keywords: []};
    }

    getPageKeywords = (): string[] => {
        const allMetaTags: NodeListOf<Element> = document.getElementsByTagName('meta');
        const keywords: string[] = [];

        if (allMetaTags && Object.keys(allMetaTags).length !== 0) {
            Object.keys(allMetaTags).forEach((key: string): void => {
                if (key.toLowerCase() === KEYWORDS) {
                    let keywordTags = allMetaTags[key].content.split(',');
                    keywordTags = keywordTags.map((value: string): string => value.trim());
                    keywords.push(...keywordTags);
                }
            });
        }

        return keywords;
    }

    componentDidMount(): void {
        const pageKeywords = this.getPageKeywords();
        const {keywords} = this.state;

        if (pageKeywords.length !== keywords.length && pageKeywords.every((value, key) => value !== keywords[key])) {
            this.setState({keywords: pageKeywords});
        }
    }

    render(): JSX.Element {
        const {keywords} = this.state;
        const {match} = this.props;

        if (typeof(match) === 'string' && keywords.indexOf(match) > -1
            || typeof(match) === 'object' && keywords.some((value: string): boolean => match.indexOf(value) > -1)) {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }

        return null;
    }
}
