import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../interfaces';
import {NavMenuLauncherIcon} from '../NavMenuLauncherIcon';
import {toggleNav, toggleSecondaryNav} from '../../actions/modelActions';

const connect = require<any>('react-redux').connect;

export interface IHeaderViewProps {
    style?: CSS;
    toggleNav?: () => void;
    toggleSecondaryNav?: () => void;
    primaryNav?: boolean;
    secondaryNav?: boolean;
    navIconStyle?: CSS;
}

@Radium
export class HeaderViewImpl extends React.Component<IHeaderViewProps> {

    showNavLauncherIcon = (
        isNavigationPresent: boolean,
        position: string,
        toggleNavigation: () => void,
    ): JSX.Element => {
        const {navIconStyle} = this.props;
        return (
            isNavigationPresent &&
            <NavMenuLauncherIcon
                    style={[navIconDefaultStyle, navIconStyle]}
                    position={position}
                    onClick={toggleNavigation}
            />
        );
    };

    render(): JSX.Element {
        return (
            <div style={[headerStyle, this.props.style]} className="header">
                {this.showNavLauncherIcon(this.props.primaryNav, 'left', this.props.toggleNav)}
                {this.showNavLauncherIcon(this.props.secondaryNav, 'right', this.props.toggleSecondaryNav)}
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state): {secondaryNav: boolean, primaryNav: boolean} => {
    return {
        secondaryNav: state.navMenu.secondaryNav,
        primaryNav: state.navMenu.primaryNav,
    };
};

const mapDispatchToProps = (dispatch): {toggleNav: () => void, toggleSecondaryNav: () => void} => {
    return {
        toggleNav: (): void => dispatch(toggleNav()),
        toggleSecondaryNav: (): void => dispatch(toggleSecondaryNav()),
    };
};

export const headerStyle: CSS = {
    position: 'relative',
    top: 0,
    width: '100%',
};

export const navIconDefaultStyle: CSS = {
    color: '#777',
};

export const HeaderView = connect(mapStateToProps, mapDispatchToProps)(HeaderViewImpl);
