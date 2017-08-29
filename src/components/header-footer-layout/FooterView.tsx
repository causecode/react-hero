import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../interfaces';

export interface IFooterViewProps {
    style?: CSS;
}

@Radium
export class FooterView extends React.Component<IFooterViewProps, void> {
    render(): JSX.Element {
        return <div style={[footerStyle,this.props.style]} className="footer">{this.props.children}</div>;
    }
}

export const footerStyle: CSS = {
    position: 'relative',
    bottom: 0,
    width: '100%',
};
