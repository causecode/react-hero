import * as React from 'react';
import {DefaultModel, BaseModel} from '../models/BaseModel';
import {ComponentService, ComponentType} from '../utils/componentService';
import {ModelService} from '../utils/modelService';
import {IInstanceContainerProps, IFromJS} from '../interfaces';
import {IInjectedProps} from 'react-router';
import {INSTANCE_NOT_FOUND} from '../constants';
import {ErrorPage} from '../components/ErrorPage';
import {IGenericEditPageProps} from '../components/CRUD/GenericEditPage';
import {connect} from 'react-redux';
import {isEmpty, initializeFormWithInstance, objectEquals, getResourceParams} from '../utils/appService';
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

    handleSubmit = (instance: BaseModel, successCallBack?: (any) => {}, 
            failureCallBack?: (any) => {}): void => {
        if (this.isCreatePage()) {
            instance.$save(true, {}, successCallBack, failureCallBack);
        } else {
            instance.$update(true, {}, successCallBack, failureCallBack);
        }
    }

    handleDelete = (instance: BaseModel, successCallBack?: (any) => {}, 
            failureCallBack?: (any) => {}): void => {
        instance.$delete(true, {}, successCallBack, failureCallBack);
    };

    componentWillReceiveProps(nextProps: EditPageProps): void {
        let currentInstance: BaseModel = this.props.instance;
        let nextInstance: BaseModel = nextProps.instance;
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
        let Page: ComponentType = ComponentService
                .getFormPage(this.props.params.resource, this.isCreatePage()) ;
        return(
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state: IFromJS, ownProps: EditPageProps): Object {
    let {location, params} = ownProps;
    let isCreate: boolean = isCreatePage(location.pathname);

    if (!params.resource && location.pathname) {
        let ownPropsParams:
                {resource: string, resourceID: string} = getResourceParams(location.pathname);
        params.resource = ownPropsParams.resource;
        params.resourceID = ownPropsParams.resourceID;
    }

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
        instance,
    };
}

let EditPage = connect(
    mapStateToProps
)(EditPageImpl);

export {EditPage};
