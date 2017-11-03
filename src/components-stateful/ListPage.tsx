import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {ComponentService} from '../utils/componentService';
import {IRouteParams} from '../interfaces';

export class ListPage extends React.Component<RouteComponentProps<IRouteParams>> {

    render(): JSX.Element {
        let resource: string = this.props.match.params.resource;
        let Page: React.ComponentClass<{resource: string}> = ComponentService
                .getListPage(resource) as React.ComponentClass<{resource: string}>;
        return (
            <Page resource={resource} />
        );
    }
}
