import * as React from 'react';
import { fetchInstanceData } from '../actions/instanceActions';
import {BaseModel} from '../models/BaseModel';
import {GenericShowPage} from './../components/CRUD/GenericShowPage';
import {ComponentService} from '../utils/componentService';
const connect: any = require<any>('react-redux').connect;
import {ModelService} from '../utils/modelService';

export class ShowPageImpl extends React.Component<IInstanceContainerProps, {}> {

    static defaultProps: IInstanceContainerProps = {
        fetchInstanceData: (resource, resourceID) => { },
        instances: [],
        params: {resource: '', resourceID: ''}
    };

    componentWillMount() {
        const { resource, resourceID } = this.props.params;
        this.props.fetchInstanceData(resource, resourceID);
    }

    render() {
        const resource = this.props.params.resource;
        let Model: new(instanceData) => IBaseModel = ModelService.getModel(resource);
        const instance: IBaseModel = this.props.instances[resource] || new Model({});
        const childProps = {instance: instance, resource: resource};
        let Page: new() => React.Component<{}, {}> = ComponentService.getShowPage(resource);
        return (
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state): {instances: IBaseModel[]} {
    let instances: IBaseModel[] = state.instances.toJS();
    return {
        instances: instances
    };
}

function mapDispatchToProps(dispatch): {fetchInstanceData: (resource: string, resourceID: string) => void } {
    return {
        fetchInstanceData: (resource: string, resourceID: string) => {
            dispatch(fetchInstanceData(resource, resourceID));
        }
    };
}

let ShowPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowPageImpl);

export {ShowPage};
