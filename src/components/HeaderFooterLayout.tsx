import {ResponsiveView, IResponsiveView} from "./ResponsiveView";
import * as React from 'react';
import {BurgerIcon} from './BurgerIcon';
import * as Bootstrap from 'react-bootstrap';
import {Motion, spring} from 'react-motion';

export class HeaderView extends React.Component<any, any>{
	// TODO Add Header specific behaviour.
	render() {
		return <div>{this.props.children}</div>
	}
}

export class FooterView extends React.Component<any,any> {
	// TODO Add Footer specific behaviour.
	render() {
		return <div>{this.props.children}</div>
	}
}

export class ContentView extends React.Component<any, any> {
	// TODO Add Content specific behaviour.
	render() {
		return <div>{this.props.children}</div>
	}
}

export class NavigationMenu extends React.Component<any, any> {
	// TODO Add NavigationMenu specific behaviour.
	render() {
		return <div>{this.props.children}</div>
	}
}

interface IHeaderFooterLayoutProps {
	fixedHeader: boolean,
	fixedFooter: boolean,
	menu: boolean,
	menuPosition: 'left'|'right';
	children?: any;
}

interface IHeaderFooterLayoutState {
	open?: boolean;
}

export class HeaderFooterLayout extends React.Component<IHeaderFooterLayoutProps, IHeaderFooterLayoutState>{

	header: JSX.Element;
	footer: JSX.Element;
	content: JSX.Element;
	nav: JSX.Element;
	menu: HTMLDivElement;
	private isNavBarPresent: boolean = false;


	constructor(props: IHeaderFooterLayoutProps) {
		super();
		this.header = this.footer = this.content = <div></div>;
		this.state = {open: false};
		if (props.children) {
			for(let child of props.children) {
				switch (child.type.name) {
					case 'HeaderView':
						this.header = child;
						break;
					case 'ContentView':
						this.content = child;
						break;
					case 'FooterView':
						this.footer = child;
						break;
					case 'NavigationMenu':
						this.setNav(child);
						break;
				}
			}
		}
	}

	protected setHeader(headerImpl: JSX.Element) {
		this.header = headerImpl;
	}

	protected setContent(contentImpl: JSX.Element) {
		this.content = contentImpl;
	}

	protected setFooter(footerImpl: JSX.Element) {
		this.footer = footerImpl;
	}

	protected setNav(NavImpl: JSX.Element) {
		this.isNavBarPresent = true;
		this.nav = NavImpl;
	}

	private toggleNav = () => {
		this.setState({open: !this.state.open})
	};

	render() {
		return (
			<div>
				<Motion style={{x: spring(this.state.open ? 0 : -100 )}}>
					{({x}) =>
					<div className="nav-menu" style={{ WebkitTransform: `translate3d(${x}%, 0, 0)`, transform: `translate3d(${x}%, 0, 0)`,}}>
						<i className="fa fa-times" onClick={this.toggleNav} />
						{this.nav}
					</div>
					}
				</Motion>
				<div className="header">
					{(() => {
						if (this.isNavBarPresent)
							return <BurgerIcon handleClick={this.toggleNav} />;
						return
						})()}
					{this.header}
				</div>
				<div className="content">
					{this.content}
				</div>
				<div>
					{this.footer}
				</div>
			</div>
		)
	}
}

