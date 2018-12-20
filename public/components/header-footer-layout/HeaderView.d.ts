/// <reference types="react" />
import * as React from 'react';
import { CSS } from '../../interfaces';
export interface IHeaderViewProps {
    style?: CSS;
    toggleNav?: () => void;
    toggleSecondaryNav?: () => void;
    primaryNav?: boolean;
    secondaryNav?: boolean;
    navIconStyle?: CSS;
}
export declare class HeaderViewImpl extends React.Component<IHeaderViewProps> {
    showNavLauncherIcon: (isNavigationPresent: boolean, position: string, toggleNavigation: () => void) => JSX.Element;
    render(): JSX.Element;
}
export declare const headerStyle: CSS;
export declare const navIconDefaultStyle: CSS;
export declare const HeaderView: any;
