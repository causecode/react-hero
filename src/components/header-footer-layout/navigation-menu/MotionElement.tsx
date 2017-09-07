/*
* This a complete re-write of SliderNavMenu in react-hero, this component should be renamed to SliderNavMenu.
* PrimarySliderNav and SecondarySliderNav should wrap this component and pass the props -> {isPrimaryNav,
* style}. The button element should be removed and navigation drawer toggling should be handled based on the
* values available from the redux store.
*/

import * as React from 'react';
import * as Radium from 'radium';
import {Motion, spring} from 'react-motion';

export interface IMotionElementState {
    open: boolean;
}
export interface IMotionElementProps {
    open?: boolean;
    isPrimary?: boolean;
    style?: object, /* type object can be changed to CSS imported from 'react-hero' */
}

@Radium
export class MotionElement extends React.Component<IMotionElementProps, IMotionElementState> {
    constructor(props: IMotionElementProps) {
        super(props);
        this.state = {
            open: false,
        };
    }
    handleClick = (): void => {
        this.setState({open: !this.state.open});
    };
    render(): JSX.Element {
        let primaryMenuPosition: {menuClosePosition: number, menuOpenPosition: number} = {
            menuClosePosition: -400,
            menuOpenPosition: 0,
        };
        let secondaryMenuPosition: {menuClosePosition: number, menuOpenPosition: number} = {
            menuClosePosition: 400,
            menuOpenPosition: 0,
        };
        let menuPosition = this.props.isPrimary ? primaryMenuPosition : secondaryMenuPosition;
        let menuStyle = this.props.isPrimary ? primaryMenuStyle : secondaryMenuStyle;
        return (
            <div>
                {/* Button component should not be here this is for testing purpose, toggling of the Navigation
                    Slider should be handled based on the state in the redux store */}
                <button onClick={this.handleClick}>Click Me</button>
                <Motion style={{
                    x: spring(this.state.open ? menuPosition.menuOpenPosition : menuPosition.menuClosePosition)}}>
                        {({x}) =>
                            <div style={[{
                                transform: `translate3d(${x}px,0,0)`,
                                backgroundColor: '#e91e63',
                                width: 300,
                                height: 900,
                                position: 'fixed',
                                top: 0,
                            }, menuStyle, this.props.style]}/>
                        }
                </Motion>
            </div>
        );
    }
}

const primaryMenuStyle: object = { /* type object can be changed to CSS imported from 'react-hero' */
    left: 0,
};

const secondaryMenuStyle: object = { /* This object be changed to CSS imported from 'react-hero' */
    right: 0,
};
