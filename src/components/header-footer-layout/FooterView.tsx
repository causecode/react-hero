import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../interfaces';

export interface IFooterViewProps {
    style?: CSS;
    isSticky?: boolean;
}

@Radium
export class FooterView extends React.Component<IFooterViewProps, void> {
    render(): JSX.Element {
        const footerClass = this.props.isSticky ? 'footer container navbar-fixed-bottom' : 'footer';
        return (
            <div style={[this.props.style]} className={footerClass}>
                {this.props.children}
            </div>
        );
    }
}
