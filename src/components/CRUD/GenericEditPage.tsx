import * as React from 'react';
import {Grid, Col, FormGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import {IInstancePageProps} from '../../interfaces';
import {BaseModel, DefaultModel} from '../../models/BaseModel';
import {generateForm, getModelString, initializeFormWithInstance, isEmpty} from '../../utils/appService';
import {store} from '../../store';
const {Form} = require<any>('react-redux-form');

export interface IGenericEditPageProps extends IInstancePageProps {
    location?: {pathname?: string};
    handleSubmit: (instance: BaseModel) => void;
    handleDelete?: (instance: BaseModel) => void;
    params: {resource: string};
    instance: BaseModel;
}

export class GenericEditPage extends React.Component<IGenericEditPageProps, void> {
    static defaultProps: IGenericEditPageProps = {
        handleSubmit: (instance: BaseModel): void => {},
        params: {resource: ''},
        instance: new DefaultModel({})
    };

    getResource(): string {
        return this.props.params.resource || this.props.instance.resourceName || '';
    }

    fetchFormInstance = (): BaseModel => {
        let instance = this.props.instance;
        instance.properties = store.getState().forms[`RHForms`][this.props.instance.resourceName].properties; 
        return instance;
    }

    handleSubmit = (): void => {
        // Not using connect here to avoid rerendering of component on change of instance properties.
        this.props.handleSubmit(this.fetchFormInstance());
    }

    handleDelete = (): void => {
        if (this.props.handleDelete && this.props.handleDelete instanceof Function) {
            this.props.handleDelete(this.fetchFormInstance()); 
        }
    }

    componentWillMount(): void {
        initializeFormWithInstance(this.props.instance);
    }

    render(): JSX.Element {
        let {instance, handleDelete} = this.props;
        if (isEmpty(instance) || isEmpty(instance.properties)) {
            throw new Error('Instance not found while rendering GenericEditPage');
        }
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
