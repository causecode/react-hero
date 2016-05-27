import {ResponsiveView} from "./ResponsiveView";
import {IResponsiveView} from "./ResponsiveView";
import * as React from 'react';

abstract class HeaderView extends React.Component<any, any> {
	//TODO Add Header specific behaviour.
	render() {
		return null
	}
}

abstract class FooterView extends React.Component<any,any> {
	//TODO Add Header specific behaviour.
	render() {
		return null
	}
}

abstract class ContentView extends React.Component<any, any> {
	//TODO Add Header specific behaviour.
	render() {
		return null
	}
}

interface IHeaderFooterLayoutProps {
	fixedHeader: boolean,
	fixedFooter: boolean,
	menu: boolean,
	menuPosition: 'left'|'right'
}

export class HeaderFooterLayout extends React.Component<IHeaderFooterLayoutProps, {}>{

	header: JSX.Element;
	footer: JSX.Element;
	content: JSX.Element;

	constructor() {
		super();
		this.header = this.footer = this.content = <div></div>;
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

	render() {
		return (
			<div>
			<div>{this.header}</div>
			<div>{this.content}</div>
			<div>{this.footer}</div>
			</div>
		)
	}
}

