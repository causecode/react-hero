import * as React from 'react';
import * as Radium from 'radium';

export interface INavMenuLauncherIconProps {
    onClick?: () => void;
    position?: string;
    style?: React.CSSProperties;
}

@Radium
export class NavMenuLauncherIcon extends React.Component<INavMenuLauncherIconProps> {

    static defaultProps: INavMenuLauncherIconProps = {
        onClick: () => {},
        position: 'left',
        style: {},
    };

    handleClick = (): void => {
        this.props.onClick();
    };

    render(): JSX.Element {
        return(
            <span
                style={this.props.style}
                className={`burger-icon highlight-on-hover float-${this.props.position}`}
                onClick={this.handleClick}>
                <span className="fa fa-bars" />
            </span>
        );
    }
}
