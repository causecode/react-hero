import * as React from 'react';
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
export interface IHeaderFooterLayoutProps {
    menuPosition: 'left' | 'right';
    children?: any;
    open?: boolean;
    toggleNav?: () => void;
    style?: {
        header: React.CSSProperties;
        nav: React.CSSProperties;
        content: React.CSSProperties;
        footer: React.CSSProperties;
        navIcon: React.CSSProperties;
    };
}
export declare class HeaderFooterLayoutImpl extends React.Component<IHeaderFooterLayoutProps, {}> {
    header: JSX.Element;
    footer: JSX.Element;
    content: JSX.Element;
    nav: JSX.Element;
    static defaultProps: IHeaderFooterLayoutProps;
    private isNavBarPresent;
    parseChild: (child: any) => void;
    constructor(props: IHeaderFooterLayoutProps);
    protected setHeader(headerImpl: JSX.Element): void;
    protected setContent(contentImpl: JSX.Element): void;
    protected setFooter(footerImpl: JSX.Element): void;
    protected setNav(NavImpl: JSX.Element): void;
    componentWillMount(): void;
    render(): JSX.Element;
}
declare let HeaderFooterLayout: any;
export { HeaderFooterLayout };
