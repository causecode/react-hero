import {PagedList} from '../../containers/PagedList';
import * as React from 'react';

export interface IGenericListPage extends React.Props<{}> {
    resource: string;
}

export class GenericListPage extends React.Component<IGenericListPage, {}> {

    static defaultProps: IGenericListPage = {
        resource: ''
    };

    render() {
        return (
            <div className="listPage">
                <PagedList resource={this.props.resource}/>
            </div>
        );
    }
}
