import * as React from 'react';
import { Grid, Col, Row, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import {MissingInstanceError} from '../../errors/MissingInstanceError';
import {Stub} from '../../interfaces/interfaces';
import {IInstancePageProps} from '../../interfaces/interfaces';
import {BaseModel} from '../../models/BaseModel';
import {ModelService} from '../../utils/modelService';
import {IInjectedProps} from 'react-router';
import {connect} from 'react-redux';
import {store }from '../../store/store';

export interface IGenericEditPageProps extends IInstancePageProps {
    isCreatePage: boolean;
    handleSubmit: (instance: BaseModel, e: Event) => void;
    handleDelete?: (instance: BaseModel) => void;
    params: {resource: string};
    instance: BaseModel;
}

export class GenericEditPage extends React.Component<IGenericEditPageProps, {instance: BaseModel}> {
    static defaultProps: IGenericEditPageProps = {
        isCreatePage: false,
        handleSubmit: (instance: BaseModel, e: Event): void => {},
        params: {resource: ''},
        instance: new BaseModel({})
    };

    constructor(props: IGenericEditPageProps) {
        super();
        this.state = { instance: props.instance };
    }

    componentWillReceiveProps(nextProps: IGenericEditPageProps) {
        this.setState({instance: nextProps.instance});
    }

    getResource(): string {
        return this.props.params.resource || this.props.instance.resourceName || '';
    }

    handleChange = (key: string, event: Event & {target: {value: string}}): void  => {
        let instance = this.state.instance;
        instance.properties[key] = event.target.value;
        this.setState({instance: instance});
    };

    render(): JSX.Element {
        let { instance, handleSubmit, handleDelete } = this.props;
        let instanceKeys: string[] = Object.keys(instance.properties);
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
                                            value={this.state.instance.properties[key]}
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
                            <Link className="btn btn-default" to={`${this.getResource()}/list`}>Cancel</Link>
                        </Col>
                    </FormGroup>
                </Grid>
            </form>
        );
    }
}
