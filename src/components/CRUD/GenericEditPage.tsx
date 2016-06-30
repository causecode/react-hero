/// <reference path="crudInterfaces.d.ts" />
import * as React from 'react';
import { fetchInstanceData } from '../../actions/data';
import { Grid, Col, Row, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import BaseModel from "../../models/BaseModel";
const connect = require<any>('react-redux').connect;

interface IInstancePageState {
    instance: IBaseModel;
}

class GenericEditPage extends React.Component<IInstancePageProps,IInstancePageState> {

    constructor(props: IInstancePageProps) {
        super();
        this.state = {instance: props.instances[props.params.resource]}
    }

    componentWillMount() {
        const { resource, resourceID } = this.props.params;
        this.props.fetchInstanceData(resource, resourceID);
    }

    handleChange = (key: string, event: any)  => {
        let instance = this.state.instance;
        instance.instanceData[key] = event.target.value;
        this.setState({instance: instance});
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
        this.state.instance = instance;
        let instanceKeys = Object.keys(instance ? instance.instanceData : {});
        return (
            <form className="data-edit-form" onSubmit={this.handleSubmit.bind(this, this.state.instance)}>
                <Grid>
                    {instanceKeys.map(key => {
                        return (
                            <Row key={instanceKeys.indexOf(key)}>
                                <FormGroup>
                                    <Col sm={3}><ControlLabel>{key}</ControlLabel></Col>
                                    <Col sm={4}>
                                        <FormControl
                                            type="text"
                                            value={this.state.instance.instanceData[key]}
                                            onChange={this.handleChange.bind(this, key)}
                                        />
                                    </Col>
                                </FormGroup>
                            </Row>
                        )
                    })}
                    <FormGroup>
                        <Col sm={4} smOffset={3}>
                            <Button bsStyle="primary" type="submit">Update</Button>
                            <Button bsStyle="danger" onClick={this.handleDelete.bind(this, this.state.instance)}>Delete</Button>
                            <Link className="btn btn-default" to={`${resource}/list`}>Cancel</Link>
                        </Col>
                    </FormGroup>
                </Grid>
            </form>
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
)(GenericEditPage)