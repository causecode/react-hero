import * as React from 'react';
import {DefaultModel, BaseModel} from '../models/BaseModel';
import {ComponentService} from '../utils/componentService';
import {ModelService} from '../utils/modelService';
import {IInstanceContainerProps} from '../interfaces';
import {IInjectedProps} from 'react-router';
import {INSTANCE_NOT_FOUND} from '../constants';
import {ErrorPage} from '../components/ErrorPage';
import {IGenericEditPageProps} from '../components/CRUD/GenericEditPage';
import {connect} from 'react-redux';
import {isEmpty, initializeFormWithInstance, objectEquals} from '../utils/appService';
import {store} from '../store';
import '../init';

function isCreatePage(pathName: string): boolean {
    if (!pathName) {
        return false;
    }
    return pathName.toLowerCase().indexOf('create') > -1;
}
export type EditPageProps = IInstanceContainerProps & 
        IInjectedProps

export class EditPageImpl extends React.Component<EditPageProps, void> {
    static defaultProps: EditPageProps = {
        instance: new DefaultModel({}),
        params: {resource: '', resourceID: ''},
        location: {pathname: ''},
    };

    isCreatePage(): boolean {
        return isCreatePage(this.props.location.pathname);
    }

    fetchInstanceFromServer = (): void =>  {
        const {resource, resourceID} = this.props.params;
        if (resourceID) {
            ModelService.getModel(resource).get(
                resourceID,
                false,
                {},
                () => {},
                () => {},
                store.getState(),
                'edit'
            );
        }
    }

    componentWillMount(): void {
        if (!this.isCreatePage()) {
            this.fetchInstanceFromServer();
        }
        initializeFormWithInstance(this.props.instance, this.isCreatePage());
    }

    handleSubmit = (instance: BaseModel): void => {
        if (this.isCreatePage()) {
            instance.$save(true);
        } else {
            instance.$update(true);
        }
    }

    handleDelete = (): void => {
        this.props.instance.$delete(true);
    };

    componentWillReceiveProps(nextProps: EditPageProps) {
        let currentInstance = this.props.instance;
        let nextInstance = nextProps.instance;
        if (!objectEquals(nextInstance, currentInstance)) {
            initializeFormWithInstance(nextProps.instance, this.isCreatePage());
        }
    }

    render(): JSX.Element {
        let instance: BaseModel = this.props.instance;
        if (!isEmpty(instance) && !isEmpty(instance.properties) && instance.resourceName) {
            /*
             * React-redux-form does not save class instances in the store. Hence Recreating the instance
             * here in case the instance was coming from the React-redux-form store.
             */
            let ModelClass: typeof BaseModel = ModelService.getModel(instance.resourceName); 
            instance = new ModelClass(instance.properties);
        }
        if (!(instance instanceof BaseModel)) {
            return (
                <ErrorPage message={INSTANCE_NOT_FOUND}/>
            );
        }
        const childProps: IGenericEditPageProps = {location: this.props.location, params: this.props.params,
                handleSubmit: this.handleSubmit, instance, handleDelete: this.handleDelete, 
                isCreatePage: this.isCreatePage()};
        let Page = ComponentService
                .getFormPage(this.props.params.resource, this.isCreatePage()) ;
        return(
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state, ownProps): Object {
    let isCreate: boolean = isCreatePage(ownProps.location.pathname); 
    let ModelClass: typeof BaseModel = ModelService.getModel(ownProps.params.resource);
    let instance: BaseModel;
    if (!isCreate) {
        instance = ModelClass.get<BaseModel>(
                ownProps.params.resourceID, 
                true, 
                {}, 
                () => {}, 
                () => {},
                state,
                '' as 'edit' | 'create' 
            );
    } else {
        instance = new ModelClass({});
    }
    return {
        instance 
    };
}

let EditPage = connect(
    mapStateToProps
)(EditPageImpl);

export {EditPage};
