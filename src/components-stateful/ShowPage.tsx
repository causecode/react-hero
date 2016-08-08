import * as React from 'react';
import {BaseModel} from '../models/BaseModel';
import {GenericShowPage} from './../components/CRUD/GenericShowPage';
import {ComponentService} from '../utils/componentService';
const connect: any = require<any>('react-redux').connect;
import {ModelService} from '../utils/modelService';
import {IInstanceContainerProps} from '../interfaces/interfaces';
import {ComponentType} from '../utils/componentService';

export class ShowPageImpl extends React.Component<IInstanceContainerProps, {}> {

    static defaultProps: IInstanceContainerProps = {
        instances: [],
        params: {resource: '', resourceID: ''}
    };

    fetchInstanceData(resource: string , resourceID: string) {
        ModelService.getModel(resource).get(resourceID);
    }

    componentWillMount() {
        const { resource, resourceID } = this.props.params;
        this.fetchInstanceData(resource, resourceID);
    }

    render() {
        const resource = this.props.params.resource;
        let Model: typeof BaseModel = ModelService.getModel(resource);
        const instance: BaseModel = this.props.instances[resource] || new Model({});
        const childProps = {instance: instance, resource: resource};
        let Page: React.ComponentClass<{}> = ComponentService.getShowPage(resource) as React.ComponentClass<{}>;
        return (
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state): {instances: BaseModel[]} {
    let instances: BaseModel[] = state.instances.toJS();
    return {
        instances: instances
    };
}

let ShowPage = connect(
    mapStateToProps
)(ShowPageImpl);

export {ShowPage};
