import * as React from 'react';
import * as Radium from 'radium';
import {NavMenuLauncherIcon} from './NavMenuLauncherIcon';
import {Motion, spring} from 'react-motion';
import {toggleNav, toggleSecondaryNav} from '../actions/modelActions';
import {CSS} from '../interfaces';

// Importing connect this way because of bug in react-redux type definition
// TODO Revisit https://github.com/DefinitelyTyped/DefinitelyTyped/issues/8866
const connect = require<any>('react-redux').connect;

// Importing styles.
require<any>('../../styles/index.css');
require<any>('bootstrap/dist/css/bootstrap.min.css');
require<any>('font-awesome/css/font-awesome.min.css');

const headerType: string = 'Header';
const contentType: string = 'Content';
const footerType: string = 'Footer';
const navigationMenuType = 'NavigationMenu';

export class HeaderView extends React.Component<{}, {}> {
    static componentType: string = headerType;
    // TODO Add Header specific behaviour.
    render(): JSX.Element {
        return <div>{this.props.children}</div>;
    }
}

export class FooterView extends React.Component<{}, {}> {
    static componentType: string = footerType;
    // TODO Add Footer specific behaviour.
    render(): JSX.Element {
        return <div>{this.props.children}</div>;
    }
}

export class ContentView extends React.Component<{}, {}> {
    // TODO Add Content specific behaviour.
    static componentType: string = contentType;
    render(): JSX.Element {
        return <div>{this.props.children}</div>;
    }
}

export class NavigationMenu extends React.Component<{}, {}> {
    // TODO Add NavigationMenu specific behaviour.
    static componentType: string = navigationMenuType;
    render(): JSX.Element {
        return <div>{this.props.children}</div>;
    }
}

export interface IHeaderFooterLayoutStyle {
    header?: CSS;
    primaryNav?: CSS;
    secondaryNav?: CSS;
    content?: CSS;
    footer?: CSS;
    navIcon?: CSS;
}

export interface IHeaderFooterLayoutProps {
    primaryMenuPosition: 'left'|'right';
    secondaryMenuPosition?: 'left'|'right';
    children?: any;
    open?: boolean;
    secondaryNavOpen?: boolean;
    toggleNav?: () => void;
    toggleSecondaryNav?: () => void;
    style?: IHeaderFooterLayoutStyle;
}

const mapStateToProps = (state): {open: boolean, secondaryNavOpen: boolean}  => {
    return {
        open: state.open,
        secondaryNavOpen: state.secondaryNavOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleNav: (): void => dispatch(toggleNav()),
        toggleSecondaryNav: (): void => dispatch(toggleSecondaryNav()),
    };
};

@Radium
export class HeaderFooterLayoutImpl extends React.Component<IHeaderFooterLayoutProps, {}> {

    header: JSX.Element;
    footer: JSX.Element;
    content: JSX.Element;
    primaryNav: JSX.Element;
    secondaryNav: JSX.Element;

    static defaultProps: IHeaderFooterLayoutProps = {
        primaryMenuPosition: 'left',
        secondaryMenuPosition: 'right',
        style: {
            header: {},
            primaryNav: {},
            secondaryNav: {},
            content: {},
            footer: {},
            navIcon: {},
        },
    };

    private isNavBarPresent: boolean = false;
    private isSecondaryNavBarPresent: boolean = false;
    private navMenuCount: number = 0;

    // type `any` is intentional because child can be anything.
    parseChild = (child: any): void => {
        switch (child.type.componentType) {
            case headerType:
                this.header = child;
                break;
            case contentType:
                this.content = child;
                break;
            case footerType:
                this.footer = child;
                break;
            case navigationMenuType:
                // Maximum of two navigation drawer should be rendered.
                if (++this.navMenuCount <= 2) {
                    this.setNav(child, this.navMenuCount);
                }
                break;
        }
    };

    constructor(props: IHeaderFooterLayoutProps) {
        super();
        this.header = this.footer = this.content = <div></div>;
        this.state = {open: false};
        if (props.children) {
            if (props.children.length) {
                for (let child of props.children) {
                    this.parseChild(child);
                }
            } else {
                this.parseChild(props.children);
            }
        }
    }

    protected setHeader(headerImpl: JSX.Element): void {
        this.header = headerImpl;
    }

    protected setContent(contentImpl: JSX.Element): void {
        this.content = contentImpl;
    }

    protected setFooter(footerImpl: JSX.Element): void {
        this.footer = footerImpl;
    }

    protected setNav(NavImpl: JSX.Element, navMenuCount: number): void {
        if (navMenuCount === 2) {
            this.isSecondaryNavBarPresent = true;
            this.secondaryNav = NavImpl;
        } else {
            this.isNavBarPresent = true;
            this.primaryNav = NavImpl;
        }
    }

    componentWillMount(): void {
        if (this.isNavBarPresent && !this.props.primaryMenuPosition) {
            throw new Error('The prop primaryMenuPosition has not been defined.');
        }
    }

    renderNavMenuLauncherIcon = (isPrimaryNav: boolean): JSX.Element => {
        const {toggleNav, primaryMenuPosition, style, secondaryMenuPosition, toggleSecondaryNav} = this.props;

        return (
            <NavMenuLauncherIcon
                    key={`${isPrimaryNav ? 'primary-nav-icon' : 'secondary-nav-icon'}`}
                    style={style.navIcon}
                    position={isPrimaryNav ? primaryMenuPosition : secondaryMenuPosition}
                    onClick={isPrimaryNav ? toggleNav : toggleSecondaryNav}
            />
        );
    }

    renderNavMenu = (isPrimaryNav: boolean): JSX.Element => {
        const {toggleNav, primaryMenuPosition, style, secondaryMenuPosition, toggleSecondaryNav} = this.props;

        const menuPosition: string = isPrimaryNav ? primaryMenuPosition : secondaryMenuPosition;
        const navMenuClasses: string = `nav-menu ${menuPosition}`;
        const menuClosePosition: number = menuPosition === 'left' ? -100 : 100;

        let closeButtonClasses: string = 'fa fa-times highlight-on-hover ';
        closeButtonClasses += menuPosition === 'left' ? 'right' : 'left';

        const customStyle: CSS = style[isPrimaryNav ? 'primaryNav' : 'secondaryNav'] || {};

        return (
            <Motion
                style={{x: spring(this.props[isPrimaryNav ? 'open' : 'secondaryNavOpen'] ? 0 : menuClosePosition)}}
                key={isPrimaryNav ? 'primary-nav' : 'secondary-nav'}>
                {({x}: {x: number}): JSX.Element =>
                    <div
                        className={navMenuClasses}
                        style={[
                            {WebkitTransform: `translate3d(${x}%, 0, 0)`, transform: `translate3d(${x}%, 0, 0)`},
                            customStyle,
                        ]}>
                        <i className={closeButtonClasses} onClick={isPrimaryNav ? toggleNav : toggleSecondaryNav}/>
                        {this[isPrimaryNav ? 'primaryNav' : 'secondaryNav']}
                    </div>
                }
            </Motion>
        );
    }

    render(): JSX.Element {
        const {style} = this.props;

        return (
            <div>
                {this.isNavBarPresent && this.renderNavMenu(true)}
                {this.isSecondaryNavBarPresent && this.renderNavMenu(false)}
                <div className="header" style={style.header}>
                    {this.isNavBarPresent && this.renderNavMenuLauncherIcon(true)}
                    {this.isSecondaryNavBarPresent && this.renderNavMenuLauncherIcon(false)}
                    {this.header}
                </div>
                <div className="content" style={style.content}>
                    {this.content}
                </div>
                <div className="footer" style={style.footer}>
                    {this.footer}
                </div>
            </div>
        );
    }
}

let HeaderFooterLayout = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderFooterLayoutImpl);

export {HeaderFooterLayout};
