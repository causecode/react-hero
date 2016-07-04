import {IListPage} from '../../containers/ListPage';
import {PagedList} from '../../containers/PagedList';
import * as React from 'react';

export interface IListPage {
    params?: IRouteParams;
}

export function GenericListPage(props) {
    return (
        <div className="listPage">
            <PagedList resource={props.params.resource}/>
        </div>
    );
}
