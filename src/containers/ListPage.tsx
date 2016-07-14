import * as React from 'react';
import {ComponentService} from '../utils/componentService';
import {PagedList} from './PagedList';

export interface IListPage extends React.Props<{}> {
    params?: IRouteParams;
}

export class ListPage extends React.Component<IListPage, {}> {

    static defaultProps: IListPage = {
        params: {resource: ''}
    };

    constructor() {
        super();
    }

    render() {
        let resource: string = this.props.params.resource;
        let Page: new() => React.Component<{}, {}> = ComponentService.getListPage(resource);
        let childProps = {resource: resource};
        return (
            <Page {...childProps} />
        );
    }
}
