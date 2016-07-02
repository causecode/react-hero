/// <reference path="../components/CRUD/crudInterfaces.d.ts" />
import * as React from 'react';
import { fetchInstanceData } from '../actions/data';
import { Grid, Col, Row, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import BaseModel from "../models/BaseModel";
import GenericEditPage from "./../components/CRUD/GenericEditPage";
const connect = require<any>('react-redux').connect;

interface IInstancePageState {
    instance: IBaseModel;
}

class EditPage extends React.Component<IInstancePageProps,IInstancePageState> {

    componentWillMount() {
        const { resource, resourceID } = this.props.params;
        this.props.fetchInstanceData(resource, resourceID);
    }

    handleSubmit = (instance: BaseModel, e: Event): void => {
        e.preventDefault();
        instance.$save()
    }

    handleDelete = (instance: BaseModel) : void => {
        instance.$delete();
    }

    render() {
        const { resource, resourceID } = this.props.params;
        const instance: IBaseModel= this.props.instances ? this.props.instances[resource] : {};
        let instanceKeys = Object.keys(instance ? instance.instanceData : {});
        const childProps = {resource: resource, handleSubmit: this.handleSubmit, handleDelete: this.handleDelete, instance: instance};
        return(
            <GenericEditPage {...childProps}/>
        );
    }
}

function mapStateToProps(state) {
    let instances: JSON = state.instances.toJS();
    return {
        instances: instances
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchInstanceData: (resource: string, resourceID: string) => {dispatch(fetchInstanceData(resource, resourceID))}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPage)