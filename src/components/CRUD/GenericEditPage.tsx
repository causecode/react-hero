import * as React from 'react';
import {Grid, Col, FormGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import {IInstancePageProps} from '../../interfaces/interfaces';
import {BaseModel, DefaultModel} from '../../models/BaseModel';
import {generateForm, getModelString, initializeFormWithInstance} from '../../utils/appService';
import {store} from '../../store/store';
const {Form} = require<any>('react-redux-form');

export interface IGenericEditPageProps extends IInstancePageProps {
    isCreatePage: boolean;
    handleSubmit: (instance: BaseModel) => void;
    handleDelete?: (instance: BaseModel) => void;
    params: {resource: string};
    instance: BaseModel;
}

export class GenericEditPage extends React.Component<IGenericEditPageProps, {instance: BaseModel}> {
    static defaultProps: IGenericEditPageProps = {
        isCreatePage: false,
        handleSubmit: (instance: BaseModel): void => {},
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

    fetchFormInstance = () => {
        return store.getState().forms[`RHForms`][this.props.instance.resourceName];
    }

    handleSubmit = () => {
        // Not using connect here to avoid rerendering of component on change of instance properties.
        this.props.handleSubmit(this.fetchFormInstance());
    }

    handleDelete = () => {
        this.props.handleDelete(this.fetchFormInstance()); 
    }

    componentWillMount() {
        initializeFormWithInstance(this.props.instance);
    }

    render(): JSX.Element {
        let {instance, handleDelete} = this.props;
        return (
            <Form
                    className="data-edit-form"
                    onSubmit={this.handleSubmit}
                    model={getModelString(instance.resourceName)}
            >
                <Grid>
                    {generateForm(instance)}
                    <FormGroup>
                        <Col sm={4} smOffset={3}>
                            <Button bsStyle="primary" type="submit">
                                {(() => {return this.props.handleDelete ? 'Update' : 'Create';})()}
                            </Button>
                                {(() => {
                                    if (handleDelete) {
                                        return (
                                        <Button bsStyle="danger" onClick={this.handleDelete}>
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
