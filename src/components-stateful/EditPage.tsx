import * as React from 'react';
import {BaseModel} from '../models/BaseModel';
import {GenericEditPage} from './../components/CRUD/GenericEditPage';
import {ComponentService} from '../utils/componentService';
const connect: any = require<any>('react-redux').connect;
import {ModelService} from '../utils/modelService';
import {IInstanceContainerProps} from '../interfaces/interfaces';
import {IInjectedProps} from 'react-router';

export interface IInstanceContainerState {
    instance: BaseModel;
}

export class EditPageImpl extends React.Component<IInstanceContainerProps, IInstanceContainerState> {

    static defaultProps: IInstanceContainerProps = {
        instances: [],
        params: {resource: '', resourceID: ''}
    };

    fetchInstanceData(resource: string, resourceID: string): void {
        ModelService.getModel(resource).get(resourceID);
    }

    componentWillMount(): void {
        const { resource, resourceID } = this.props.params;
        this.fetchInstanceData(resource, resourceID);
    }

    handleSubmit = (instance: BaseModel, e: Event): void => {
        e.preventDefault();
        instance.$update();
    };

    handleDelete = (instance: BaseModel) : void => {
        instance.$delete();
    };

    render(): JSX.Element {
        const resource = this.props.params.resource;
        let Model: typeof BaseModel = ModelService.getModel(resource);
        const instance: BaseModel = this.props.instances[resource] || new Model({});
        const childProps = {resource: resource, handleSubmit: this.handleSubmit, handleDelete: this.handleDelete,
                instance: instance};
        let Page: React.ComponentClass<{}> = ComponentService.getEditPage(resource) as React.ComponentClass<{}>;
        return(
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

let EditPage = connect(
    mapStateToProps
)(EditPageImpl);

export {EditPage};
