import * as React from 'react';

export interface INavMenuLauncherIconProps {
    onClick?: () => void;
    position?: string;
}

export class NavMenuLauncherIcon extends React.Component<INavMenuLauncherIconProps, void> {

    static defaultProps: INavMenuLauncherIconProps = {
        onClick: () => {},
        position: 'left'
    };

    handleClick = (): void => {
        this.props.onClick();
    };

    render(): JSX.Element {
        return(
            <span className={`burger-icon highlight-on-hover float-${this.props.position}`} onClick={this.handleClick}>
                <span className="fa fa-bars" />
            </span>
        );
    }
}
