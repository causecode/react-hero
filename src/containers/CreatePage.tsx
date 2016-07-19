import * as React from 'react';
import {ModelService} from '../utils/modelService';
import {IRoute} from 'react-router';
import {fetchInstanceData} from '../actions/instanceActions';
import {BaseModel} from '../models/BaseModel';
import {GenericEditPage} from '../components/CRUD/GenericEditPage';
import {connect} from 'react-redux';
import {ComponentService} from '../utils/componentService';

export interface ICreatePageProps {
    params: IRouteParams;
    instances: JSON;
    fetchInstanceData: (resource: string) => void;
}

export class CreatePageImpl extends React.Component<IInstanceContainerProps, {}> {

    static defaultProps: IInstanceContainerProps = {
        fetchInstanceData: (resource: string, resourceID: string): void => { },
        instances: [],
        params: {resource: '', resourceID: ''}
    };

    handleSubmit = (instance: BaseModel, e: Event): void => {
        e.preventDefault();
        instance.$save();
    };

    componentWillMount() {
        this.props.fetchInstanceData(this.props.params.resource);
    }

    render() {
        // TODO handle case where No Instance has yet been created.
        let resource: string = this.props.params.resource;
        let Model: new(Object) => IBaseModel = ModelService.getModel(resource);
        const instance = this.props.instances[resource] || new Model({});
        if (instance) {
            for (let key of Object.keys(instance.instanceData)) {
                instance.instanceData[key] = '';
            }
        }
        const childProps = {handleSubmit: this.handleSubmit, instance: instance, resource: resource};
        let Page: new() => React.Component<{}, {}> = ComponentService.getCreatePage(resource);
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

function mapDispatchToProps(dispatch) {
    return {
        fetchInstanceData: (resource: string) => {
            dispatch(fetchInstanceData(resource, '1'));
        }
    };
}

let CreatePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePageImpl);

export {CreatePage};
