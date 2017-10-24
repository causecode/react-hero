import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {DefaultModel, BaseModel} from '../models/BaseModel';
import {ComponentService} from '../utils/componentService';
const connect: any = require<any>('react-redux').connect;
import {ModelService} from '../utils/modelService';
import {IInstanceContainerProps, IFromJS, IRouteParams} from '../interfaces';
import {PAGE_NOT_FOUND} from '../constants';
import {ErrorPage} from '../components/ErrorPage';
import {store} from '../store';
import {getResourceParams} from '../utils/appService';

export type ShowPageProps = IInstanceContainerProps & RouteComponentProps<IRouteParams>

export class ShowPageImpl extends React.Component<ShowPageProps, void> {

    static defaultProps: IInstanceContainerProps = {
        instance: new DefaultModel({}),
    };

    fetchInstanceData(resource: string , resourceID: string): void {
        ModelService.getModel(resource).get(resourceID, false, {}, () => {}, () => {}, store.getState(), 'edit');
    }

    componentWillMount(): void {
        const {resource, resourceID} = this.props.match.params;
        this.fetchInstanceData(resource, resourceID);
    }

    render(): JSX.Element {
        if (!(this.props.instance instanceof BaseModel)) {
            return (
                <ErrorPage message={PAGE_NOT_FOUND} />
            );
        }
        const resource: string = this.props.match.params.resource;
        const childProps = {instance: this.props.instance, resource: resource};
        let Page: React.ComponentClass<{}> = ComponentService.getShowPage(resource) as React.ComponentClass<{}>;
        return (
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state: IFromJS, ownProps: ShowPageProps): {instance: BaseModel} {
    let {location, match} = ownProps;

    if (!match.params.resource && location.pathname) {
        let ownPropsParams:
                {resource: string, resourceID: string} = getResourceParams(location.pathname);
        match.params.resource = ownPropsParams.resource;
        match.params.resourceID = ownPropsParams.resourceID;
    }

    let instance: BaseModel = ModelService.getModel(match.params.resource)
            .get<BaseModel>(match.params.resourceID, true, {}, () => {}, () => {}, state, null);
    return {
        instance,
    };
}

let ShowPage = connect(
    mapStateToProps
)(ShowPageImpl);

export {ShowPage};
