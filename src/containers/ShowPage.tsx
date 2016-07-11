/// <reference path='../components/CRUD/crudInterfaces.d.ts' />
import * as React from 'react';
import {fetchInstanceData} from '../actions/instanceActions';
import {connect} from 'react-redux';
import {Table, Row, Col} from 'react-bootstrap';
import BaseModel from '../models/BaseModel';
import {ComponentService} from '../utils/componentService';
import GenericShowPage from './../components/CRUD/GenericShowPage';

class ShowPage extends React.Component<IInstanceContainerProps, {}> {

    componentWillMount() {
        const { resource, resourceID } = this.props.params;
        this.props.fetchInstanceData(resource, resourceID);
    }

    render() {
        const { resource, resourceID } = this.props.params;
        const instance: IBaseModel = this.props.instances[resource] ? this.props.instances[resource] : {};
        const childProps = {instance: instance, resource: resource};
        let Page: new() => React.Component<{}, {}> = ComponentService.getShowPage(resource);
        return (
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state) {
    let instances: JSON = state.instances.toJS();
    return {
        instances: instances
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchInstanceData: (resource: string, resourceID: string) => {
            dispatch(fetchInstanceData(resource, resourceID));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowPage);
