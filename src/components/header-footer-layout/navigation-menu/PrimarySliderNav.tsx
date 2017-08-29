import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../../interfaces';
import {SliderNav} from './SliderNav';

export interface IPrimarySliderNav {
    style?: CSS;
}

@Radium
export class PrimarySliderNav extends React.Component<IPrimarySliderNav, void> {
    render(): JSX.Element {
        return (
                <SliderNav
                        navStyle={[navStyle,this.props.style]} isPrimaryNav={true} navContent={this.props.children} />
        );
    }
}

const navStyle: CSS = {
    padding: 'none',
    width: '30%',
    backgroundColor: '#eea303',
};
