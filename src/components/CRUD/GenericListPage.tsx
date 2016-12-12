import {PagedList} from '../../components-stateful/PagedList';
import * as React from 'react';

export interface IGenericListPageProps {
    resource: string;
}

export class GenericListPage extends React.Component<IGenericListPageProps, void> {

    static defaultProps: IGenericListPageProps = {
        resource: ''
    };

    render(): JSX.Element {
        return (
            <div className="generic-list-page">
                <PagedList resource={this.props.resource} max={20}/>
            </div>
        );
    }
}
