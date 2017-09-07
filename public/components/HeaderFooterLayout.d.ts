/// <reference types="react" />
import * as React from 'react';
import { CSS } from '../interfaces';
export declare class HeaderView extends React.Component<{}, {}> {
    static componentType: string;
    render(): JSX.Element;
}
export declare class FooterView extends React.Component<{}, {}> {
    static componentType: string;
    render(): JSX.Element;
}
export declare class ContentView extends React.Component<{}, {}> {
    static componentType: string;
    render(): JSX.Element;
}
export declare class NavigationMenu extends React.Component<{}, {}> {
    static componentType: string;
    render(): JSX.Element;
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
    primaryMenuPosition: 'left' | 'right';
    secondaryMenuPosition?: 'left' | 'right';
    children?: any;
    open?: boolean;
    secondaryNavOpen?: boolean;
    toggleNav?: () => void;
    onNavClose?: () => void;
    toggleSecondaryNav?: () => void;
    style?: IHeaderFooterLayoutStyle;
}
export declare class HeaderFooterLayoutImpl extends React.Component<IHeaderFooterLayoutProps, {}> {
    header: JSX.Element;
    footer: JSX.Element;
    content: JSX.Element;
    primaryNav: JSX.Element;
    secondaryNav: JSX.Element;
    static defaultProps: IHeaderFooterLayoutProps;
    private isNavBarPresent;
    private isSecondaryNavBarPresent;
    private navMenuCount;
    parseChild: (child: any) => void;
    constructor(props: IHeaderFooterLayoutProps);
    componentWillMount(): void;
    protected setHeader(headerImpl: JSX.Element): void;
    protected setContent(contentImpl: JSX.Element): void;
    protected setFooter(footerImpl: JSX.Element): void;
    protected setNav(NavImpl: JSX.Element): void;
    renderNavMenuLauncherIcon: (isPrimaryNav: boolean) => JSX.Element;
    renderNavMenu: (isPrimaryNav: boolean) => JSX.Element;
    render(): JSX.Element;
}
declare let HeaderFooterLayout: any;
export { HeaderFooterLayout };
