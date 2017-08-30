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
}

@Radium
export class HeaderViewImpl extends React.Component<IHeaderViewProps, void> {
    render(): JSX.Element {
        return (
            <div style={[headerStyle,this.props.style]} className="header">
                {this.props.primaryNav &&
                        <NavMenuLauncherIcon style={navIconStyle}
                                             position={'left'} onClick={this.props.toggleNav}/>}
                {this.props.secondaryNav &&
                        <NavMenuLauncherIcon style={navIconStyle}
                                             position={'right'} onClick={this.props.toggleSecondaryNav}/>}
                {this.props.children}
            </div>
        );
    }
}

export const headerStyle: CSS = {
    position: 'relative',
    top: 0,
    width: '100%',
};

export const navIconStyle: CSS = {
    color: '#777',
};

const mapStateToProps = (state): {open: boolean, secondaryNav: boolean, primaryNav: boolean} => {
    return {
        open: state.open,
        secondaryNav: state.navMenu.secondaryNav,
        primaryNav: state.navMenu.primaryNav,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleNav: (): void => dispatch(toggleNav()),
        toggleSecondaryNav: (): void => dispatch(toggleSecondaryNav()),
    };
};

export const HeaderView = connect(mapStateToProps, mapDispatchToProps)(HeaderViewImpl);