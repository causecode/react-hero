import * as React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {Title, Description, Content, ButtonList, ButtonListItem} from '../components/Widgets/Widgets';
import {HeaderView, FooterView, ContentView, NavigationMenu} from '../components/HeaderFooterLayout';
import {HeaderFooterLayout} from '../components/HeaderFooterLayout';
import {ResponsiveView} from '../components/ResponsiveView';
import {ListPage} from '../components-stateful/ListPage';
import {ShowPage} from '../components-stateful/ShowPage';
import {EditPage} from '../components-stateful/EditPage';
import {ErrorPage} from '../components/ErrorPage';
import {PAGE_NOT_FOUND} from '../constants';
require<void>('../init');

const headerFooterLayoutStyles = {
        header: {
            padding: 'none',
        },
        nav: {
            padding: 'none',
        },
        content: {
            color: '#888',
        },
        footer: {
            backgroundColor: '#888',
            fontSize: '15px',
            color: 'white',
        },
        navIcon: {
            color: '#777',
        },
};

export class NewPage extends React.Component<void, void> {

    render(): JSX.Element {
        return (
            <HeaderFooterLayout menuPosition="left" style={headerFooterLayoutStyles}>
            <HeaderView>
                <Content>
                    <Title>New App</Title>
                    <ButtonList highlightOnHover={true}>
                        <ButtonListItem><Link to="/">Home</Link> </ButtonListItem>
                        <ButtonListItem><Link to="/page2">Button 2</Link></ButtonListItem>
                        <ButtonListItem><Link to="/resp">Responsive View Page</Link></ButtonListItem>
                        <ButtonListItem><Link to="/blog/list">Blog List</Link></ButtonListItem>
                        <ButtonListItem><Link to="/user/list">User List</Link></ButtonListItem>
                    </ButtonList>
                </Content>
            </HeaderView>
            <ContentView>
                <Switch>
                    <Route exact path="/" component={HomeContent}/>
                    <Route path="/page2" component={Page2Content}/>
                    <Route path="/resp" component={ContentImpl}/>
                    <Route path="/:resource/list" component={ListPage}/>
                    <Route path="/:resource/create" component={EditPage}/>
                    <Route path="/:resource/show/:resourceID" component={ShowPage} />
                    <Route path="/:resource/edit/:resourceID" component={EditPage} />
                    <Route render={() => <ErrorPage message={PAGE_NOT_FOUND}/>} />
                </Switch>
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
        );
    }
}

// This component is for testing.
class UserEditPage extends React.Component<any, any> {
    render() {
        return (
            <h1>Test</h1>
        );
    }
}

export class HomeContent extends ResponsiveView<any, any> {
    protected renderDefault(): JSX.Element {
        return <h1 style={{height: '30em'}}>This is the home page</h1>;
    }
}

export class Page2Content extends ResponsiveView<any, any> {
    protected renderDefault(): JSX.Element {
        return <h1 style={{height: '30em'}}>Just Another Page!!</h1>;
    }
}

export class ContentImpl extends ResponsiveView<any, any> {

    protected renderDefault(): JSX.Element {
        return (
            <h1>This is the default Content</h1>
        );
    }

    protected renderMobile(): JSX.Element {
        return (
            <h1>This is the mobile Content</h1>
        );
    }

    protected renderMobilePortrait(): JSX.Element {
        return (
            <h1>This is the Mobile Portrait Content</h1>
        );
    }

    protected renderTabletLandscape(): JSX.Element {
        return (
            <h1>This is the tablet landscape content</h1>
        );
    }
}
