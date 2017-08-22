import * as React from 'react';
import {NavMenuLauncherIcon} from './NavMenuLauncherIcon';
import {Motion, spring} from 'react-motion';
import {toggleNav} from '../actions/modelActions';
const objectAssign: any = require<any>('object-assign');

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

export interface IHeaderFooterLayoutProps {
    menuPosition: 'left'|'right';
    children?: any;
    open?: boolean;
    toggleNav?: () => void;
    onNavClose?: () => void;
    style?: {
        header: React.CSSProperties,
        nav: React.CSSProperties,
        content: React.CSSProperties,
        footer: React.CSSProperties,
        navIcon: React.CSSProperties
    };
}

const mapStateToProps = (state): {open: boolean}  => {
    return {
        open: state.open
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleNav: (): void => dispatch(toggleNav())
    };
};

export class HeaderFooterLayoutImpl extends React.Component<IHeaderFooterLayoutProps, {}> {

    header: JSX.Element;
    footer: JSX.Element;
    content: JSX.Element;
    nav: JSX.Element;

    static defaultProps: IHeaderFooterLayoutProps = {
        menuPosition: 'left',
        style: {
            header: {},
            nav: {},
            content: {},
            footer: {},
            navIcon: {}
        }
    };

    private isNavBarPresent: boolean = false;

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
                this.setNav(child);
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

    protected setNav(NavImpl: JSX.Element): void {
        this.isNavBarPresent = true;
        this.nav = NavImpl;
    }

    componentWillMount(): void {
        if (this.isNavBarPresent && !this.props.menuPosition) {
            throw new Error('The prop menuPosition has not been defined.');
        }
    }

    render(): JSX.Element {
        const {toggleNav, menuPosition, style, onNavClose} = this.props;
        let navMenuClasses: string = `nav-menu ${menuPosition}`;
        let menuClosePosition: number = (menuPosition === 'left') ? -100 : 100;
        let closeButtonClasses: string = 'fa fa-times highlight-on-hover ';
        closeButtonClasses += (menuPosition === 'left') ? 'right' : 'left';

        const getNavMenu = () => {
            if (this.isNavBarPresent) {
                return (
                    <Motion style={{x: spring(this.props.open ? 0 : menuClosePosition )}}>
                        {({x}) =>
                        <div
                                className={navMenuClasses}
                                style={objectAssign({}, {WebkitTransform: `translate3d(${x}%, 0, 0)`,
                                        transform: `translate3d(${x}%, 0, 0)`}, style.nav || {})}
                        >
                            <i className={closeButtonClasses} onClick={onNavClose || toggleNav}/>
                            {this.nav}
                        </div>
                            }
                    </Motion>
                );
            } else {
                return;
            }
        };

        return (
            <div>
                {getNavMenu()}
                <div className="header" style={style.header}>
                    {(() => {
                        if (this.isNavBarPresent) {
                            return (
                                <NavMenuLauncherIcon
                                        style={style.navIcon}
                                        position={`${this.props.menuPosition}`}
                                        onClick={toggleNav}/>
                            );
                        }
                    })()}
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
