import * as React from 'react';
export interface INavMenuLauncherIconProps {
    onClick?: () => void;
    position?: string;
    style?: React.CSSProperties;
}
export declare class NavMenuLauncherIcon extends React.Component<INavMenuLauncherIconProps, void> {
    static defaultProps: INavMenuLauncherIconProps;
    handleClick: () => void;
    render(): JSX.Element;
}
