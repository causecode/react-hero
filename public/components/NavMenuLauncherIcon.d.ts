import * as React from 'react';
export interface INavMenuLauncherIconProps {
    onClick?: () => void;
    position?: string;
}
export declare class NavMenuLauncherIcon extends React.Component<INavMenuLauncherIconProps, {}> {
    handleClick: () => void;
    render(): JSX.Element;
}
