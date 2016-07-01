import * as React from 'react';
import {HeaderView, FooterView, ContentView, NavigationMenu} from './../components/HeaderFooterLayout';
import HeaderFooterLayout from './../components/HeaderFooterLayout';
import {ResponsiveView} from './../components/ResponsiveView';
import {Title, Description, Content, ButtonList, ButtonListItem} from './../components/Widgets';
import {NavMenuLauncherIcon} from './../components/NavMenuLauncherIcon';
import {Router, Route, Link} from 'react-router';
import {hashHistory} from 'react-router';
import ListPage from '../containers/PagedList';
import DropDownFilter from '../components/PagedList/Filters/DropDownFilter';
import DateRangeFilter from '../components/PagedList/Filters/DateRangeFilter';
import RangeFilter from '../components/PagedList/Filters/RangeFilter';
import QueryFilter from '../components/PagedList/Filters/QueryFilter';
import GenericShowPage from './../components/CRUD/GenericShowPage';
import GenericEditPage from './../components/CRUD/GenericEditPage';
import GenericListPage from "../components/CRUD/GenericListPage";
import {ComponentService} from '../utils/componentService';

ComponentService.register(BlogListPage);

export class NewPage extends React.Component<any, any> {

    constructor() {
        super();
    }

    render() {
        return (
                <HeaderFooterLayout fixedHeader={true} menuPosition={'right'}>
                <HeaderView>
                    <Content>
                        <Title>New App</Title>
                        <ButtonList highlightOnHover={true}>
                                <ButtonListItem><Link to="/">Home</Link> </ButtonListItem>
                                <ButtonListItem><Link to="/page2">Button 2</Link></ButtonListItem>
                                <ButtonListItem><Link to="/resp">Responsive View Page</Link></ButtonListItem>
                                <ButtonListItem><Link to="/blog/list">Page List</Link></ButtonListItem>
                            </ButtonList>
                    </Content>
                </HeaderView>
                <ContentView>
                    <Router history={hashHistory}>
                        <Route path="/" component={HomeContent}/>
                        <Route path="/page2" component={Page2Content}/>
                        <Route path="/resp" component={ContentImpl}/>
                        <Route path="/:resource/list" component={GenericListPage}/>
                        <Route path="/:resource/show/:resourceID" component={GenericShowPage} />
                        <Route path="/:resource/edit/:resourceID" component={GenericEditPage} />
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
        );
    }
}

function BlogListPage(props) {
    return (
        <ListPage resource={props.params.resource}>
            <DropDownFilter
                label = 'status'
                paramName = 'status'
                possibleValues = {['enable', 'disable', 'inactive']}
            />
            <RangeFilter
                label = 'Bill Amount'
                paramName = 'billAmount'
            />
            <DateRangeFilter
                label = 'Date Created'
                paramName = 'dateCreated'
            />
            <DropDownFilter
                label = 'types'
                paramName = 'types'
                possibleValues = {['Zoo', 'Jungle', 'Forest']}
            />
            <QueryFilter
                label = "Search"
                paramName = "query"
                placeholder = {['First Name', 'Last Name', "Email"]}
            />
        </ListPage>
    )
}

// This list page is for testing
/*function UserListPage(props) {
    return (
        <div>
            <h1 style={{'background' : 'red'}}>This is MY user list page</h1>
            <ListPage resource={props.params.resource}>
                <DropDownFilter
                    label = 'status'
                    paramName = 'status'
                    possibleValues = {['enable', 'disable', 'inactive']}
                />
                <RangeFilter
                    label = 'Bill Amount'
                    paramName = 'billAmount'
                />
                <DateRangeFilter
                    label = 'Date Created'
                    paramName = 'dateCreated'
                />
                <DropDownFilter
                    label = 'types'
                    paramName = 'types'
                    possibleValues = {['Zoo', 'Jungle', 'Forest']}
                />
                <QueryFilter
                    label = "Search"
                    paramName = "query"
                    placeholder = {['First Name', 'Last Name', "Email"]}
                />
            </ListPage>
        </div>
    )
}*/

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

    constructor() {
        super();
    }

    protected renderDefault(): JSX.Element {
        return (
            <h1>THis is the default Content</h1>
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
