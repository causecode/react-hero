import {PagedList} from '../../components-stateful/PagedList';
import * as React from 'react';

export interface IGenericListPage extends React.Props<void> {
    resource: string;
}

export class GenericListPage extends React.Component<IGenericListPage, void> {

    static defaultProps: IGenericListPage = {
        resource: ''
    };

    render(): JSX.Element {
        return (
            <div className="listPage">
                <PagedList resource={this.props.resource}/>
            </div>
        );
    }
}
