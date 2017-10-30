import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../interfaces';

export interface IHeaderFooterLayoutProps {
    style?: CSS;
}

@Radium
export class HeaderFooterLayout extends React.Component<IHeaderFooterLayoutProps, {}> {
    render(): JSX.Element {
        return (
            <div style={[layoutStyle, this.props.style]}>
                {this.props.children}
            </div>
        );
    }
}

export const layoutStyle: CSS = {
    position: 'relative',
    width: '100%',
    height: '100%',
};
