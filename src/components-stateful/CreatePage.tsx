import * as React from 'react';
import {ModelService} from '../utils/modelService';
import {IRoute} from 'react-router';
import {BaseModel} from '../models/BaseModel';
import {GenericEditPage} from '../components/CRUD/GenericEditPage';
import {connect} from 'react-redux';
import {ComponentService} from '../utils/componentService';
import {IInstanceContainerProps} from '../interfaces/interfaces';
import {IRouteParams} from '../interfaces/interfaces';

export class CreatePageImpl extends React.Component<IInstanceContainerProps, void> {

    static defaultProps: IInstanceContainerProps = {
        instances: [],
        params: {resource: ''}
    };

    fetchInstanceData(resource: string): void {
        ModelService.getModel(resource).get(1);
    }

    handleSubmit = (instance: BaseModel, e: Event): void => {
        e.preventDefault();
        instance.$save();
    };

    componentWillMount() {
        this.fetchInstanceData(this.props.params.resource);
    }

    render() {
        // TODO handle case where No Instance has yet been created.
        let resource: string = this.props.params.resource;
        let Model: typeof BaseModel = ModelService.getModel(resource);
        const instance = this.props.instances[resource] || new Model({});
        if (instance) {
            for (let key of Object.keys(instance.properties)) {
                instance.properties[key] = '';
            }
        }
        const childProps = {handleSubmit: this.handleSubmit, instance: instance, resource: resource};
        let Page: React.ComponentClass<{}> = ComponentService.getCreatePage(resource) as React.ComponentClass<{}>;
        return (
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        instances: state.instances.toJS(),
    };
}

let CreatePage = connect(
    mapStateToProps
)(CreatePageImpl);

export {CreatePage};
