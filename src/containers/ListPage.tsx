import * as React from 'react';
import {ComponentService} from '../utils/componentService';
import {PagedList} from './PagedList';

export interface IListPage {
    params?: IRouteParams;
}

export class ListPage extends React.Component<IListPage, {}> {

    listPage: JSX.Element;

    constructor() {
        super();
    }

    render() {
        let Page: new() => React.Component<any, any> = ComponentService.getListPage(this.props.params.resource);
        return (
            <Page {...this.props} />
        );
    }
}
