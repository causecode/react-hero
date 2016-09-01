import {ResponsiveView, IResponsiveView} from './ResponsiveView';
import * as React from 'react';
import {NavMenuLauncherIcon} from './NavMenuLauncherIcon';
import * as Bootstrap from 'react-bootstrap';
import {Motion, spring} from 'react-motion';
import {toggleNav} from '../actions/actions';
import {MapStateToProps} from 'react-redux';

// Importing connect this way because of bug in react-redux type definition
// TODO Revisit https://github.com/DefinitelyTyped/DefinitelyTyped/issues/8866
const connect = require<any>('react-redux').connect;

// Importing styles.
require<any>('../../styles/index.css');
require<any>('bootstrap/dist/css/bootstrap.min.css');
require<any>('font-awesome/css/font-awesome.min.css');

export class HeaderView extends React.Component<{}, {}> {
    // TODO Add Header specific behaviour.
    render(): JSX.Element {
        return <div>{this.props.children}</div>;
    }
}

export class FooterView extends React.Component<{}, {}> {
    // TODO Add Footer specific behaviour.
    render(): JSX.Element {
        return <div>{this.props.children}</div>;
    }
}

export class ContentView extends React.Component<{}, {}> {
    // TODO Add Content specific behaviour.
    render(): JSX.Element {
        return <div>{this.props.children}</div>;
    }
}

export class NavigationMenu extends React.Component<{}, {}> {
    // TODO Add NavigationMenu specific behaviour.
    render(): JSX.Element {
        return <div>{this.props.children}</div>;
    }
}

export interface IHeaderFooterLayoutProps {
    menuPosition: 'left'|'right';
    children?: any;
    open?: boolean;
    toggleNav?: () => void;
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
    private isNavBarPresent: boolean = false;

    parseChild = (child): void => {
        switch (child.type.name) {
            case 'HeaderView':
                this.header = child;
                break;
            case 'ContentView':
                this.content = child;
                break;
            case 'FooterView':
                this.footer = child;
                break;
            case 'NavigationMenu':
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
        const { toggleNav, menuPosition } = this.props;
        let navMenuClasses = `nav-menu ${menuPosition}`;
        let menuClosePosition = (menuPosition === 'left') ? -100 : 100;
        let closeButtonClasses = 'fa fa-times highlight-on-hover ';
        closeButtonClasses += (menuPosition === 'left') ? 'right' : 'left';

        const getNavMenu = () => {
            if (this.isNavBarPresent) {
                return (
                    <Motion style={{x: spring(this.props.open ? 0 : menuClosePosition )}}>
                        {({x}) =>
                        <div className={navMenuClasses} style={{ WebkitTransform: `translate3d(${x}%, 0, 0)`,
                                    transform: `translate3d(${x}%, 0, 0)`,}}>
                            <i className={closeButtonClasses} onClick={toggleNav}/>
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
                <div className="header">
                    {(() => {
                        if (this.isNavBarPresent) {
                            return ( <NavMenuLauncherIcon position={`${this.props.menuPosition}`}
                                    onClick={toggleNav}/>);
                            }
                        })()}
                    {this.header}
                </div>
                <div className="content">
                    {this.content}
                </div>
                <div className="footer">
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
