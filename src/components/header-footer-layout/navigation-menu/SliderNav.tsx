import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../../interfaces';
import {Motion, spring} from 'react-motion';
import {toggleNav, toggleSecondaryNav} from '../../../actions/modelActions';
import {showPrimaryNav, showSecondaryNav} from '../../../actions/navMenuAction';

// Importing styles.
require<any>('../../../../styles/index.css');
require<any>('bootstrap/dist/css/bootstrap.min.css');
require<any>('font-awesome/css/font-awesome.min.css');

const connect = require<any>('react-redux').connect;

export interface ISliderNavProps {
    isPrimaryNav: boolean;
    open?: boolean;
    secondaryNavOpen?: boolean;
    toggleNav?: () => void;
    toggleSecondaryNav?: () => void;
    navContent?: JSX.Element;
    navStyle?: CSS;
}

const mapStateToProps = (state): {open: boolean, secondaryNavOpen: boolean} => {
    return {
        open: state.open,
        secondaryNavOpen: state.secondaryNavOpen,
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

@Radium
class SliderNavImpl extends React.Component<ISliderNavProps, void> {

    constructor(props) {
        super(props);
        props.isPrimaryNav ? props.setPrimaryNav(true) : props.setSecondaryNav(true);
    }

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

        const motion = <Motion
                            style={{x: spring(this.props[isPrimaryNav ? 'open' : 'secondaryNavOpen'] ?
                                0 : menuClosePosition )}}
                            key={isPrimaryNav ? 'primary-nav' : 'secondary-nav'}>
                            {
                                ({x} : {x: number}): JSX.Element =>
                                    <div className={navMenuClasses}
                                         style={[
                                             {WebkitTransform: `translate3d(${x}%, 0, 0)`,
                                                 transform: `translate3d(${x}%, 0, 0)`},
                                             navStyle,
                                         ]}>
                                        <i className={closeButtonClasses}
                                           onClick = {isPrimaryNav ? toggleNav : toggleSecondaryNav}/>
                                        {this.props.navContent}
                                    </div>
                            }
                        </Motion>;
        return(motion);
    }
}

export const SliderNav = connect(mapStateToProps, mapDispatchToProps)(SliderNavImpl);
