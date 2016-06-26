/// <reference path="crudInterfaces.d.ts" />
import * as React from 'react';
import { connect } from 'react-redux';
import { fetchInstanceData } from '../../actions/data';
import { Grid, Col, Row, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';


interface IInstancePageState {
    instanceData: {}
}

class GenericEditPage extends React.Component<IInstancePageProps,IInstancePageState> {

    constructor(props: IInstancePageProps) {
        super();
        this.state = {instanceData: props.instanceData};
    }

    componentWillMount() {
        const { resource, resourceID } = this.props.params;
        this.props.fetchInstanceData(resource, resourceID);
    }

    handleChange = (key: string, event: any)  => {
        let instanceData = this.state.instanceData;
        instanceData[key] = event.target.value;
        this.setState({instanceData: instanceData})
    }

    render() {
        const { resource, resourceID } = this.props.params;
        const instanceData = this.props.instanceData;
        this.state.instanceData = instanceData;
        let instanceKeys = Object.keys(instanceData);
        return (
            <form className="data-edit-form">
                <Grid>
                    {instanceKeys.map(key => {
                        return (
                            <Row key={instanceKeys.indexOf(key)}>
                                <FormGroup>
                                    <Col sm={3}><ControlLabel>{key}</ControlLabel></Col>
                                    <Col sm={4}>
                                        <FormControl
                                            type="text"
                                            value={this.state.instanceData[key]}
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
                            <Button bsStyle="danger">Delete</Button>
                            <Link className="btn btn-default" to={`${resource}/list`}>Cancel</Link>
                        </Col>
                    </FormGroup>
                </Grid>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        instanceData: state.data.get('blogInstance').toJS()
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