import * as React from 'react';
import * as Radium from 'radium';
import {KEYWORDS} from '../../constants';

export interface IKeywordMatcherProps {
    match: string;
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

    extractKeyword = (): string[] => {
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
        const allKeywords = this.extractKeyword();
        const {keywords} = this.state;

        if (allKeywords.length !== keywords.length && allKeywords.every((value, key) => value !== keywords[key])) {
            this.setState({keywords: allKeywords});
        }
    }

    render(): JSX.Element {
        const {keywords} = this.state;
        const {match} = this.props;

        if (keywords.indexOf(match) > -1) {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }

        return null;
    }
}
