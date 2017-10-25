import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../../interfaces';
import {SliderNav} from './SliderNav';

export interface ISecondarySliderNavProps {
    style?: CSS;
}

@Radium
export class SecondarySliderNav extends React.Component<ISecondarySliderNavProps, {}> {
    render(): JSX.Element {
        return (
            <SliderNav navStyle={[navStyle, this.props.style]} isPrimaryNav={false} navContent={this.props.children} />
        );
    }
}

const navStyle: CSS = {
    padding: 'none',
};
