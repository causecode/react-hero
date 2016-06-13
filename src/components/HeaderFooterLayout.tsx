import {ResponsiveView, IResponsiveView} from "./ResponsiveView";
import * as React from 'react';
import {NavMenuLauncherIcon} from './NavMenuLauncherIcon';
import * as Bootstrap from 'react-bootstrap';
import {Motion, spring} from 'react-motion';
import {connect} from "react-redux";

require<any>("../../styles/index.css");
require<any>("bootstrap/dist/css/bootstrap.min.css");
require<any>("font-awesome/css/font-awesome.min.css");

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

export interface IHeaderFooterLayoutProps {
	fixedHeader: boolean,
	menuPosition: 'left'|'right';
	children?: any;
}

export interface IHeaderFooterLayoutState {
	open?: boolean
}

export class HeaderFooterLayout extends React.Component<IHeaderFooterLayoutProps, IHeaderFooterLayoutState> {

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
		let navMenuClasses = `nav-menu ${this.props.menuPosition}`;
		let menuClosePosition = (this.props.menuPosition === 'left') ? -100 : 100;
		let closeButtonClasses = 'fa fa-times highlight-on-hover ';
		closeButtonClasses += (this.props.menuPosition === 'left') ? 'right' : 'left';
		return (
			<div>
				<Motion style={{x: spring(this.state.open ? 0 : menuClosePosition )}}>
					{({x}) =>
					<div className={navMenuClasses} style={{ WebkitTransform: `translate3d(${x}%, 0, 0)`, transform: `translate3d(${x}%, 0, 0)`,}}>
						<i className={closeButtonClasses} onClick={this.toggleNav}/>
						{this.nav}
					</div>
					}
				</Motion>
				<div className="header">
					{(() => {
						if (this.isNavBarPresent) {
							return ( <NavMenuLauncherIcon position={`${this.props.menuPosition}`} onClick={this.toggleNav}/>)
							}
						})()}

					{this.header}
				</div>
				<div className="content">
					{this.content}
				</div>
				<div className="footer">
					{this.footer}
				</div>
			</div>
		)
	}
}

/*
const mapStateToProps = (state) => {
	return {
		open: state.open
	}
};

let HeaderFooterLayout = connect(mapStateToProps)(HeaderFooterLayoutImpl);
*/

//export {HeaderFooterLayout};

