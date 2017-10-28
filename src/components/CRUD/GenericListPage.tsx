import * as React from 'react';
import {PagedList} from '../../components-stateful/PagedList';

export interface IGenericListPageProps {
    resource: string;
}

export class GenericListPage extends React.Component<IGenericListPageProps, {}> {

    static defaultProps: IGenericListPageProps = {
        resource: '',
    };

    render(): JSX.Element {
        return (
            <div className="generic-list-page">
                <PagedList resource={this.props.resource} max={20}/>
            </div>
        );
    }
}
