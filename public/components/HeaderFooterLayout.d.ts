import * as React from 'react';
export declare class HeaderView extends React.Component<any, any> {
    render(): JSX.Element;
}
export declare class FooterView extends React.Component<any, any> {
    render(): JSX.Element;
}
export declare class ContentView extends React.Component<any, any> {
    render(): JSX.Element;
}
export declare class NavigationMenu extends React.Component<any, any> {
    render(): JSX.Element;
}
export interface IHeaderFooterLayoutProps {
    fixedHeader: boolean;
    menuPosition: 'left' | 'right';
    children?: any;
}
export interface IHeaderFooterLayoutState {
    open?: boolean;
}
export declare class HeaderFooterLayout extends React.Component<IHeaderFooterLayoutProps, IHeaderFooterLayoutState> {
    header: JSX.Element;
    footer: JSX.Element;
    content: JSX.Element;
    nav: JSX.Element;
    menu: HTMLDivElement;
    private isNavBarPresent;
    constructor(props: IHeaderFooterLayoutProps);
    protected setHeader(headerImpl: JSX.Element): void;
    protected setContent(contentImpl: JSX.Element): void;
    protected setFooter(footerImpl: JSX.Element): void;
    protected setNav(NavImpl: JSX.Element): void;
    private toggleNav;
    render(): JSX.Element;
}
