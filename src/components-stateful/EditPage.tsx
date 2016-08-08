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

export class EditPageImpl extends React.Component<IInstanceContainerProps & IInjectedProps, IInstanceContainerState> {

    static defaultProps: IInstanceContainerProps & IInjectedProps = {
        instances: [],
        params: {resource: '', resourceID: ''},
        location: {pathname: ''}
    };

    fetchInstanceData(resource: string, resourceID: string): void {
        ModelService.getModel(resource).get(resourceID);
    }

    componentWillMount(): void {
        const { resource, resourceID } = this.props.params;
        if (resourceID) {
            this.fetchInstanceData(resource, resourceID);
        }
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
        let instance: BaseModel;
        if (this.props.location.pathname.indexOf('create') > -1 || !this.props.params.resourceID ||
                !this.props.instances[resource]) {
            instance = new Model({});
        } else {
            instance = this.props.instances[resource];
        }
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
