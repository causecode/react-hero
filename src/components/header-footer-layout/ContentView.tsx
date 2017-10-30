import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../interfaces';

export interface IContentViewProps {
    style?: CSS;
}

@Radium
export class ContentView extends React.Component<IContentViewProps, {}> {
    render(): JSX.Element {
        return (
            <div style={[contentStyle, this.props.style]} className="content">
                {this.props.children}
            </div>
        );
    }
}

export const contentStyle: CSS = {
    position: 'relative',
    width: '100%',
};
