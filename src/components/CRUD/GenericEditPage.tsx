/// <reference path='crudInterfaces.d.ts' />
import * as React from 'react';
import { Grid, Col, Row, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';

export interface IGenericEditPageProps extends IInstancePageProps {
    handleSubmit: (instance: IBaseModel, e: Event) => void;
    handleDelete?: (instance: IBaseModel) => void;
}

export default class GenericEditPage extends React.Component<IGenericEditPageProps, IGenericEditPageState> {

    constructor(props: IGenericEditPageProps) {
        super();
        this.state = { instance: props.instance };
    }

    handleChange = (key: string, event: any)  => {
        let instance = this.state.instance;
        instance.instanceData[key] = event.target.value;
        this.setState({instance: instance});
    };

    render() {
        const { instance, handleSubmit, handleDelete, resource } = this.props;
        this.state.instance = instance;
        let instanceKeys = Object.keys(instance ? instance.instanceData : {});
        return (
            <form className="data-edit-form" onSubmit={handleSubmit.bind(this, this.state.instance)}>
                <Grid>
                    {instanceKeys.map(key => {
                        return (
                            <Row key={instanceKeys.indexOf(key)}>
                                <FormGroup>
                                    <Col sm={3}>
                                        <ControlLabel>{key}</ControlLabel>
                                    </Col>
                                    <Col sm={4}>
                                        <FormControl
                                            type="text"
                                            value={this.state.instance.instanceData[key]}
                                            onChange={this.handleChange.bind(this, key)}
                                        />
                                    </Col>
                                </FormGroup>
                            </Row>
                        );
                    })}
                    <FormGroup>
                        <Col sm={4} smOffset={3}>
                            <Button bsStyle="primary" type="submit">
                                {(() => {return this.props.handleDelete ? 'Update' : 'Create';})()}
                            </Button>
                            {(() => {
                                if (handleDelete) {
                                    return (
                                    <Button bsStyle="danger" onClick={handleDelete.bind(this, this.state.instance)}>
                                        Delete
                                    </Button>
                                        );
                                    } else {
                                    return;
                                    }
                                })()}
                            <Link className="btn btn-default" to={`${resource}/list`}>Cancel</Link>
                        </Col>
                    </FormGroup>
                </Grid>
            </form>
        );
    }
}
