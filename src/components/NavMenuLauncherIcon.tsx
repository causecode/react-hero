import * as React from 'react';
import * as Actions from "../components/common/actions/actions";

export interface INavMenuLauncherIconProps {
	onClick?: () => void;
	position?: string;
}

export class NavMenuLauncherIcon extends React.Component<INavMenuLauncherIconProps,{}> {

	handleClick = () => {
		this.props.onClick()
	};

	render() {
		return(
			<span className={`burger-icon highlight-on-hover float-${this.props.position}`} onClick={this.handleClick}>
				<span className="fa fa-bars" />
			</span>
		)
	}
}