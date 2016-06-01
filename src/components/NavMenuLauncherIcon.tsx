import * as React from 'react';
import {store} from "../store";
import * as Actions from "../components/common/actions/actions";

interface INavMenuLauncherIconProps {
	handleClick?: () => void;
}

export class NavMenuLauncherIcon extends React.Component<INavMenuLauncherIconProps,{}> {

	handleClick() {
		store.dispatch(Actions.toggleNav())
	}

	render() {
		return(
			<span className="burger-icon highlight-on-hover" onClick={this.handleClick}>
				<span className="fa fa-bars" />
			</span>
		)
	}
}