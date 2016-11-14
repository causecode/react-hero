import * as React from 'react';
import {Grid, Col, FormGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import {IInstancePageProps} from '../../interfaces/interfaces';
import {BaseModel, DefaultModel} from '../../models/BaseModel';
import { generateForm, getModelString, initializeForm } from '../../utils/appService';
const {Form, Control} = require<any>('react-redux-form');

export interface IGenericEditPageProps extends IInstancePageProps {
    isCreatePage: boolean;
    handleSubmit: (instance: BaseModel, e: React.FormEvent) => void;
    handleDelete?: (instance: BaseModel) => void;
    params: {resource: string};
    instance: BaseModel;
}

export class GenericEditPage extends React.Component<IGenericEditPageProps, {instance: BaseModel}> {
    static defaultProps: IGenericEditPageProps = {
        isCreatePage: false,
        handleSubmit: (instance: BaseModel, e: React.FormEvent): void => {},
        params: {resource: ''},
        instance: new DefaultModel({})
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

    // postChange = (): void  => {
    //     this.forceUpdate();
    //     // this.setState({instance: instance});
    // };

    handleSubmit(context) {
        return (e: React.FormEvent) => {
            context.props.handleSubmit(context.state.instance, e);
        };
    }

    componentWillMount() {
        initializeForm(this.props.instance);
    }

    render(): JSX.Element {
        let { instance, handleDelete } = this.props;
        return (
            <Form
                    className="data-edit-form"
                    onSubmit={this.handleSubmit(this)}
                    model={getModelString(instance.resourceName)}
            >
                <Grid>
                    {generateForm(instance, this.postChange)}
                    <FormGroup>
                        <Col sm={4} smOffset={3}>
                            <Button bsStyle="primary" type="submit">
                                {(() => {return this.props.handleDelete ? 'Update' : 'Create';})()}
                            </Button>
                                {(() => {
                                    if (handleDelete) {
                                        return (
                                        <Button bsStyle="danger" onClick={handleDelete.bind(this, instance)}>
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
            </Form>
        );
    }
}
