import * as React from 'react';
import {ModelService} from '../utils/modelService';
import {IRoute} from 'react-router';
import {fetchInstanceData} from '../actions/modelActions';
import {BaseModel} from '../models/BaseModel';
import {GenericEditPage} from '../components/CRUD/GenericEditPage';
import {connect} from 'react-redux';
import {ComponentService} from '../utils/componentService';
import {IInstanceContainerProps} from '../interfaces/interfaces';
import {IRouteParams} from '../interfaces/interfaces';

export class CreatePageImpl extends React.Component<IInstanceContainerProps, {}> {

    static defaultProps: IInstanceContainerProps = {
        fetchInstanceData: (resource: string): void => { },
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
