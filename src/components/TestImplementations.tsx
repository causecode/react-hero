import * as React from 'react';
import {HeaderFooterLayout, HeaderView, FooterView, ContentView, NavigationMenu} from './HeaderFooterLayout';
import {ResponsiveView} from "./ResponsiveView";
import {Title, Description, Content, ButtonList, ButtonListItem} from "./Widgets";
import {NavMenuLauncherIcon} from "./NavMenuLauncherIcon";
import {Router, Route, Link} from 'react-router';
import {browserHistory} from "react-router";

export class NewPage extends React.Component<any, any> {

	constructor() {
		super();
	}

	render() {
		return (
				<HeaderFooterLayout fixedHeader={true} menuPosition={'left'}>
				<HeaderView>
					<Content>
						<NavMenuLauncherIcon/>
						<Title>New App</Title>
						<ButtonList highlightOnHover={true}>
								<ButtonListItem><Link to="/">Home</Link> </ButtonListItem>
								<ButtonListItem><Link to="/page2">Button 2</Link></ButtonListItem>
								<ButtonListItem><Link to="/resp">Responsive View Page</Link></ButtonListItem>
							</ButtonList>
					</Content>
				</HeaderView>
				<ContentView>
					<Router history={browserHistory}>
						<Route path="/" component={HomeContent}/>
						<Route path="/page2" component={Page2Content}/>
						<Route path="/resp" component={ContentImpl}/>
					</Router>
				</ContentView>
				<FooterView>my footer</FooterView>
				<NavigationMenu>
					<Content>
						<Title>This is the nav-mnu</Title>
						<Description>This is the description</Description>
						<ButtonList highlightOnHover={true}>
							<ButtonListItem><Link to="/">Home</Link></ButtonListItem>
							<ButtonListItem><Link to="/page2">Button 2</Link></ButtonListItem>
							<ButtonListItem><Link to="/resp">Responsive View Page</Link></ButtonListItem>
						</ButtonList>
					</Content>
				</NavigationMenu>
			</HeaderFooterLayout>
		)
	}
}

export class HomeContent extends ResponsiveView<any, any> {
	protected renderDefault():JSX.Element {
		return <h1 style={{height: '30em'}}>This is the home page</h1>;
	}

}

export class Page2Content extends ResponsiveView<any, any> {
	protected renderDefault():JSX.Element {
		return <h1 style={{height: '30em'}}>Just Another Page!!</h1>;
	}

}

export class ContentImpl extends ResponsiveView<any, any> {

	constructor() {
		super();
	}

	protected renderDefault():JSX.Element {
		return (
			<h1>THis is the default Content</h1>
		);
	}

	protected renderMobile(): JSX.Element {
		return (
			<h1>This is the mobile Content</h1>
		);
	}

	protected renderMobilePortrait():JSX.Element {
		return (
			<h1>This is the Mobile Portrait Content</h1>
		)
	}

	protected renderTabletLandscape(): JSX.Element {
		return (
			<h1>This is the tablet landscape content</h1>
		)
	}
}
