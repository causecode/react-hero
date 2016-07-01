import * as React from 'react';
import {ComponentService} from '../../utils/componentService';
import ListPage from '../../containers/PagedList';
import {IComponent} from "../../interfaces/IComponent";

export interface IListPage {
    params?: IRouteParams;
}

export default class GenericListPage extends React.Component<IListPage, {}> {

    listPage: JSX.Element;

    constructor(props: IListPage) {
        super();
    }

    getListPage(): JSX.Element {
        const resource = this.props.params.resource;
        let Page: IComponent;
        if (ComponentService.hasListPage(resource)) {
            Page = ComponentService.getListPage(resource)
            return (
                <Page {...this.props} />
            )
        } else {
            return (
                <ListPage resource={this.props.params.resource} />
            )
        }
    }

    componentWillMount() {
        this.listPage = this.getListPage();
    }

    render() {
        return (
            <div className="list-page-root">
                {this.listPage}
            </div>
        );
    }
}