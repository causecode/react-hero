import * as React from 'react';
import {ComponentService} from '../utils/componentService';
import {PagedList} from './PagedList';
import {IComponent} from '../interfaces/IComponent';

export interface IListPage {
    params?: IRouteParams;
}

export class ListPage extends React.Component<IListPage, {}> {

    listPage: JSX.Element;

    constructor() {
        super();
    }

    render() {
        let Page: IComponent = ComponentService.getListPage(this.props.params.resource);
        return (
            <Page {...this.props} />
        );
    }
}
