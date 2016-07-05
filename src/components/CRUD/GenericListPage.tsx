import {IListPage} from '../../containers/ListPage';
import {PagedList} from '../../containers/PagedList';
import * as React from 'react';

export interface IListPage {
    params?: IRouteParams;
}

export default class GenericListPage extends React.Component<IListPage, {}> {
    render() {
        return (
            <div className="listPage">
                <PagedList resource={this.props.params.resource}/>
            </div>
        );
    }
}
