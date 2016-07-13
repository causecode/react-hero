/// <reference path='../components/CRUD/crudInterfaces.d.ts' />
import * as React from 'react';
import { fetchInstanceData } from '../actions/data';
import { Grid, Col, Row, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import BaseModel from '../models/BaseModel';
import GenericEditPage from './../components/CRUD/GenericEditPage';
import {ComponentService} from '../utils/componentService';
const connect = require<any>('react-redux').connect;

export interface IInstanceContainerState {
    instance: IBaseModel;
}

export class EditPageImpl extends React.Component<IInstanceContainerProps, IInstanceContainerState> {

    static defaultProps: IInstanceContainerProps = {
        fetchInstanceData: (resource, resourceID) => { },
        instances: [],
        params: {resource: '', resourceID: ''}
    };

    componentWillMount() {
        const { resource, resourceID } = this.props.params;
        this.props.fetchInstanceData(resource, resourceID);
    }

    handleSubmit = (instance: BaseModel, e: Event): void => {
        e.preventDefault();
        instance.$update();
    };

    handleDelete = (instance: BaseModel) : void => {
        instance.$delete();
    };

    render() {
        const resource = this.props.params.resource;
        const instance: IBaseModel = this.props.instances[resource] || new BaseModel({});
        const childProps = {resource: resource, handleSubmit: this.handleSubmit, handleDelete: this.handleDelete,
                instance: instance};
        let Page: new() => React.Component<{}, {}> = ComponentService.getEditPage(resource);
        return(
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state): {instances: JSON} {
    let instances: JSON = state.instances.toJS();
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPageImpl);
