import * as React from 'react';
import * as Radium from 'radium';
import {Motion, spring} from 'react-motion';
import {CSS} from '../../../interfaces';
import {toggleNav, toggleSecondaryNav} from '../../../actions/modelActions';
import {showPrimaryNav, showSecondaryNav} from '../../../actions/navMenuAction';

// Importing styles.
require<any>('../../../../styles/index.css');
require<any>('bootstrap/dist/css/bootstrap.min.css');
require<any>('font-awesome/css/font-awesome.min.css');

const connect = require<any>('react-redux').connect;

export interface ISliderNavProps {
    isPrimaryNav: boolean;
    primaryNavOpen?: boolean;
    secondaryNavOpen?: boolean;
    toggleNav?: () => void;
    toggleSecondaryNav?: () => void;
    navContent?: JSX.Element;
    navStyle?: CSS;
    setPrimaryNav?: (visibilityStatus: boolean) => void;
    setSecondaryNav?: (visibilityStatus: boolean) => void;
    primaryNavCount?: number;
    secondaryNavCount?: number;
}

@Radium
export class SliderNavImpl extends React.Component<ISliderNavProps, void> {
    constructor(props) {
        super(props);
        props.isPrimaryNav ? props.setPrimaryNav(true) : props.setSecondaryNav(true);
    }

    checkRender = (): boolean => {
        if (this.props.primaryNavCount >= 2 || this.props.secondaryNavCount >= 2) {
            console.error('Navigation Component can\'t be more than one');
            return false;
        }
        return true;
    };

    render(): JSX.Element {
        const {
            isPrimaryNav,
            toggleNav,
            toggleSecondaryNav,
            navStyle,
        } = this.props;
        const menuPosition: string = isPrimaryNav ? 'left' : 'right';
        const navMenuClasses: string = `nav-menu ${menuPosition}`;
        const menuClosePosition: number = isPrimaryNav ? -100 : 100;

        let closeButtonClasses: string = 'fa fa-times highlight-on-hover ';
        closeButtonClasses += isPrimaryNav ? 'right' : 'left';

        const motion: JSX.Element = <Motion
                style={{x: spring(this.props[isPrimaryNav ? 'primaryNavOpen' : 'secondaryNavOpen'] ?
                        0 : menuClosePosition )}}
                key={isPrimaryNav ? 'primary-nav' : 'secondary-nav'}>
                {
                    ({x} : {x: number}): JSX.Element =>
                        <div className={navMenuClasses}
                             style={[
                                 {
                                     WebkitTransform: `translate3d(${x}%, 0, 0)`,
                                     transform: `translate3d(${x}%, 0, 0)`,
                                 },
                                 navStyle,
                             ]}>
                            <i className={closeButtonClasses}
                               onClick = {isPrimaryNav ? toggleNav : toggleSecondaryNav}/>
                            {this.props.navContent}
                        </div>
                }
            </Motion>;

        return this.checkRender() ? motion : null;
    }
}

const mapStateToProps = (state): {
    primaryNavOpen: boolean,
    secondaryNavOpen: boolean,
    primaryNavCount: number,
    secondaryNavCount: number} => {
        return {
            primaryNavOpen: state.primaryNavOpen,
            secondaryNavOpen: state.secondaryNavOpen,
            primaryNavCount: state.navMenu.primaryNavCount,
            secondaryNavCount: state.navMenu.secondaryNavCount,
        };
    };

const mapDispatchToProps = (dispatch) => {
    return {
        toggleNav: (): void => dispatch(toggleNav()),
        toggleSecondaryNav: (): void => dispatch(toggleSecondaryNav()),
        setPrimaryNav: (visibilityStatus: boolean): void => dispatch(showPrimaryNav(visibilityStatus)),
        setSecondaryNav: (visibilityStatus: boolean): void => dispatch(showSecondaryNav(visibilityStatus)),
    };
};

export const SliderNav = connect(mapStateToProps, mapDispatchToProps)(SliderNavImpl);
