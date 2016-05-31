import * as React from 'react';

interface IBurgerIconProps {
	handleClick?: () => void;
}

export class BurgerIcon extends React.Component<IBurgerIconProps,{}> {
	render() {
		return(
			<span className="burger-icon" onClick={this.props.handleClick}>
				<span className="fa fa-bars" />
			</span>
		)
	}
}