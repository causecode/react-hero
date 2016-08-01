import * as React from 'react';
import { Grid, Col, Row, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import {MissingInstanceError} from '../../errors/MissingInstanceError';
import {IBaseModel} from '../../interfaces/interfaces';
import {Stub} from '../../interfaces/interfaces';
import {IInstancePageProps} from '../../interfaces/interfaces';
import {IGenericEditPageState} from '../../interfaces/interfaces';

export interface IGenericEditPageProps extends IInstancePageProps {
    handleSubmit: (instance: IBaseModel, e: Event) => void;
    handleDelete?: (instance: IBaseModel) => void;
}

export class GenericEditPage extends React.Component<IGenericEditPageProps, IGenericEditPageState> {

constructor(props: IGenericEditPageProps) {
        super();
        this.state = { instance: props.instance };
    }

    handleChange = (key: string, event: Event & {target: {value: string}}): void  => {
        let instance = this.state.instance;
        instance.instanceData[key] = event.target.value;
        this.setState({instance: instance});
    };

    render(): JSX.Element {
        let { instance, handleSubmit, handleDelete } = this.props;
        if (!handleSubmit) {
            handleSubmit = (...args: any[]) => { return; };
        }
        let resource: string = this.props.resource;
        if (!resource) {
            resource = instance ? instance.resourceName : '';
        }
        this.state.instance = instance;
        let instanceData = (instance && instance.instanceData) ? instance.instanceData : {};
        let instanceKeys = Object.keys(instanceData);
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
