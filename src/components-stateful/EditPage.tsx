import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {DefaultModel, BaseModel} from '../models/BaseModel';
import {ComponentService, ComponentType} from '../utils/componentService';
import {ModelService} from '../utils/modelService';
import {IInstanceContainerProps, IFromJS, IRouteParams} from '../interfaces';
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
export type EditPageProps = IInstanceContainerProps & RouteComponentProps<IRouteParams>

export class EditPageImpl extends React.Component<EditPageProps, void> {
    static defaultProps: IInstanceContainerProps = {
        instance: new DefaultModel({}),
    };

    isCreatePage(): boolean {
        return isCreatePage(this.props.location.pathname);
    }

    fetchInstanceFromServer = (): void =>  {
        const {resource, resourceID} = this.props.match.params;
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

    handleSubmit = (instance: BaseModel, successCallBack?: (prop) => {},
            failureCallBack?: (prop) => {}): void => {
        if (this.isCreatePage()) {
            instance.$save(true, {}, successCallBack, failureCallBack);
        } else {
            instance.$update(true, {}, successCallBack, failureCallBack);
        }
    }

    handleDelete = (instance: BaseModel, successCallBack?: (prop) => {},
            failureCallBack?: (prop) => {}): void => {
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
        const childProps: IGenericEditPageProps = {location: this.props.location, params: this.props.match.params,
                handleSubmit: this.handleSubmit, instance, handleDelete: this.handleDelete,
                isCreatePage: this.isCreatePage()};
        let Page: ComponentType = ComponentService
                .getFormPage(this.props.match.params.resource, this.isCreatePage()) ;
        return(
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state: IFromJS, ownProps: EditPageProps): Object {
    let {location, match} = ownProps;
    let isCreate: boolean = isCreatePage(location.pathname);

    if (!match.params.resource && location.pathname) {
        let ownPropsParams:
                {resource: string, resourceID: string} = getResourceParams(location.pathname);
        match.params.resource = ownPropsParams.resource;
        match.params.resourceID = ownPropsParams.resourceID;
    }

    let ModelClass: typeof BaseModel = ModelService.getModel(ownProps.match.params.resource);
    let instance: BaseModel;
    if (!isCreate) {
        instance = ModelClass.get<BaseModel>(
                match.params.resourceID,
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
