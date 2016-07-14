import * as React from 'react';
import * as Actions from '../actions/actions';

export interface INavMenuLauncherIconProps extends React.Props<{}> {
    onClick?: () => void;
    position?: string;
}

export class NavMenuLauncherIcon extends React.Component<INavMenuLauncherIconProps, {}> {

    static defaultProps: INavMenuLauncherIconProps = {
        onClick: () => {},
        position: 'left'
    };

    handleClick = () => {
        this.props.onClick();
    };

    render() {
        return(
            <span className={`burger-icon highlight-on-hover float-${this.props.position}`} onClick={this.handleClick}>
                <span className="fa fa-bars" />
            </span>
        );
    }
}
