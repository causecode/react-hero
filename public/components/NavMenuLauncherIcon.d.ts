/// <reference types="react" />
import * as React from 'react';
export interface INavMenuLauncherIconProps {
    onClick?: () => void;
    position?: string;
    style?: React.CSSProperties;
}
export declare class NavMenuLauncherIcon extends React.Component<INavMenuLauncherIconProps, {}> {
    static defaultProps: INavMenuLauncherIconProps;
    handleClick: () => void;
    render(): JSX.Element;
}
