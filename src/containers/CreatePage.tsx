import * as React from 'react';
import {ModelService} from '../utils/modelService';
import {IRoute} from 'react-router';
import {fetchInstanceData} from '../actions/data';
import BaseModel from '../models/BaseModel';
import GenericEditPage from '../components/CRUD/GenericEditPage';
import {connect} from 'react-redux';

export interface ICreatePageProps {
    params: IRouteParams;
    instances: JSON;
    fetchInstanceData: (resource: string) => void;
}

class CreatePage extends React.Component<ICreatePageProps, {}> {

    handleSubmit(instance: any, e) {
        e.preventDefault();
        instance.$save();
    }

    componentWillMount() {
        this.props.fetchInstanceData(this.props.params.resource);
    }

    render() {
        // TODO handle case where No Instance has yet been created.
        let Model = ModelService.getModel(this.props.params.resource);
        const instance = this.props.instances ? this.props.instances[this.props.params.resource] : new Model({});
        if (instance) {
            for (let key of Object.keys(instance.instanceData)) {
                instance.instanceData[key] = '';
            }
        }
        const childProps = {handleSubmit: this.handleSubmit, instance: instance, resource: this.props.params.resource};
        return (
            <GenericEditPage {...childProps}/>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePage);
