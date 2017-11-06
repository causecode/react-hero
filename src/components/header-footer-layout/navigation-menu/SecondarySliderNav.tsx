import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../../interfaces';
import {SliderNav} from './SliderNav';

export interface ISecondarySliderNavProps {
    style?: CSS;
    onNavClose?: () => void;
}

@Radium
export class SecondarySliderNav extends React.Component<ISecondarySliderNavProps, {}> {
    render(): JSX.Element {
        return (
            <SliderNav
                    navStyle={[navStyle, this.props.style]}
                    isPrimaryNav={false}
                    navContent={this.props.children}
                    onSecondaryNavClose={this.props.onNavClose}
            />
        );
    }
}

const navStyle: CSS = {
    padding: 'none',
};
