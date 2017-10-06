import * as React from 'react';
import * as Radium from 'radium';

export interface IKeywordMatcherProps {
    match: string
}

export interface IKeywordMatcherState {
    keywords: string[]
}

@Radium
export class KeywordMatcher extends React.Component<IKeywordMatcherProps, IKeywordMatcherState> {

    constructor() {
        super();
        this.state = {keywords: []};
    }

    extractKeyword = (): string[] => {
        const metas = document.getElementsByTagName('meta');
        let keywords = [];
        if (metas) {
            for (let item in metas) {
                if (item.toLowerCase() === 'keywords') {
                    keywords = keywords.concat(metas[item].content.split(',').map((i) => i.trim()));
                }
            };
        }

        return keywords;
    }

    componentDidMount(): void {
        this.setState({keywords: this.extractKeyword()});
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
        } else {
            return null;
        }
    }
}
