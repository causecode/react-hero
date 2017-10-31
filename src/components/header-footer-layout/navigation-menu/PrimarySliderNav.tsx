import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../../interfaces';
import {SliderNav} from './SliderNav';

export interface IPrimarySliderNavProps {
    style?: CSS;
    onNavClose?: () => void;
}

@Radium
export class PrimarySliderNav extends React.Component<IPrimarySliderNavProps, void> {
    render(): JSX.Element {
        return (
            <SliderNav
                    navStyle={[navStyle,this.props.style]}
                    isPrimaryNav
                    navContent={this.props.children}
                    onPrimaryNavClose={this.props.onNavClose}
            />
        );
    }
}

const navStyle: CSS = {
    padding: 'none',
    width: '30%',
    backgroundColor: '#eea303',
};
