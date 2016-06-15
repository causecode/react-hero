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
    open?: boolean;
}
declare let HeaderFooterLayout: any;
export { HeaderFooterLayout };
