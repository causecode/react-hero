import * as React from 'react';
import {ComponentService} from '../utils/componentService';
import {PagedList} from './PagedList';
import {IRouteParams} from '../interfaces/interfaces';

export interface IListPage extends React.Props<void> {
    params?: IRouteParams;
}

export class ListPage extends React.Component<IListPage, void> {

    static defaultProps: IListPage = {
        params: {resource: ''}
    };

    render(): JSX.Element {
        let resource: string = this.props.params.resource;
        let Page: React.ComponentClass<{}> = ComponentService.getListPage(resource) as React.ComponentClass<{}>;
        let childProps = {resource: resource};
        return (
            <Page {...childProps} />
        );
    }
}