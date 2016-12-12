import * as React from 'react';
import {Grid, Col, FormGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import {IInstancePageProps} from '../../interfaces';
import {BaseModel, DefaultModel} from '../../models/BaseModel';
import {generateForm, getModelString, isEmpty} from '../../utils/appService';
import {store} from '../../store';
const {Form} = require<any>('react-redux-form');

export interface IGenericEditPageProps extends IInstancePageProps {
    location?: {pathname?: string};
    handleSubmit: (instance: BaseModel) => void;
    handleDelete?: (instance: BaseModel) => void;
    params: {resource: string};
    instance: BaseModel;
    isCreatePage: boolean;
}

export class GenericEditPage extends React.Component<IGenericEditPageProps, void> {
    static defaultProps: IGenericEditPageProps = {
        handleSubmit: (instance: BaseModel): void => {},
        params: {resource: ''},
        instance: new DefaultModel({}),
        isCreatePage: false
    };

    getResource(): string {
        return this.props.params.resource || this.props.instance.resourceName || '';
    }

    fetchStoreInstance = (): BaseModel => {
        let instance = this.props.instance;
        let instanceKey = this.props.isCreatePage ? `${instance.resourceName}Create` : `${instance.resourceName}Edit`;
        instance.properties = store.getState().forms[`rhForms`][instanceKey].properties; 
        return instance;
    }

    handleSubmit = (): void => {
        // Not using connect here to avoid rerendering of component on change of instance properties.
        this.props.handleSubmit(this.fetchStoreInstance());
    }

    handleDelete = (): void => {
        if (this.props.handleDelete && this.props.handleDelete instanceof Function) {
            this.props.handleDelete(this.fetchStoreInstance()); 
        }
    }

    render(): JSX.Element {
        let {instance} = this.props;
        if (isEmpty(instance) || isEmpty(instance.properties)) {
            return (
                <div></div>
            );
        }
        return (
            <Form
                    className="data-edit-form"
                    onSubmit={this.handleSubmit}
                    model={getModelString(instance.resourceName)}
            >
                <Grid>
                    {generateForm(instance, this.props.isCreatePage)}
                    <FormGroup>
                        <Col sm={4} smOffset={3}>
                            <Button bsStyle="primary" type="submit">
                                {this.props.isCreatePage ? 'Create' : 'Update'}
                            </Button>
                                {(() => {
                                    if (!this.props.isCreatePage) {
                                        return (
                                           <Button bsStyle="danger" onClick={this.handleDelete}>
                                                Delete
                                            </Button>
                                        );
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
