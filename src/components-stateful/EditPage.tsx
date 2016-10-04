import * as React from 'react';
import {BaseModel} from '../models/BaseModel';
import {GenericEditPage} from './../components/CRUD/GenericEditPage';
import {ComponentService} from '../utils/componentService';
const connect: any = require<any>('react-redux').connect;
import {ModelService} from '../utils/modelService';
import {IInstanceContainerProps} from '../interfaces/interfaces';
import {IInjectedProps} from 'react-router';
import {createInstance} from '../actions/modelActions';
import {PAGE_NOT_FOUND} from '../constants';
import {ErrorPage} from '../components/ErrorPage';

function isCreatePage(pathName: string): boolean {
    return pathName.toLowerCase().indexOf('create') > -1;
}

export type EditPageProps = IInstanceContainerProps & IInjectedProps & {createInstance?: (instance: BaseModel) => void};

export class EditPageImpl extends React.Component<EditPageProps, void> {

    static defaultProps: EditPageProps = {
        instance: new BaseModel({}),
        params: {resource: '', resourceID: ''},
        location: {pathname: ''},
        createInstance: () => {}
    };

    fetchInstanceData(resource: string, resourceID: string): void {
        ModelService.getModel(resource).get(
            resourceID,
            false,
            {},
            () => {},
            () => {},
            'edit'
        );
    }

    updateModelInstance(): void {
        const { resource, resourceID } = this.props.params;
        if (resourceID) {
            this.fetchInstanceData(resource, resourceID);
        }
    }

    componentWillMount(): void {
        this.updateModelInstance();
        let resource: string = this.props.params.resource;
        let Model: typeof BaseModel = ModelService.getModel(resource);
        if (isCreatePage(this.props.location.pathname)) {
            this.props.createInstance(new Model({}));
        }
    }

    handleSubmit(instance: BaseModel, e: Event): void {
        e.preventDefault();
        if (isCreatePage(this.props.location.pathname)) {
            instance.$save(true);
        } else {
            instance.$update(true);
        }
    }

    handleDelete = (): void => {
        this.props.instance.$delete(true);
    };

    render(): JSX.Element {
        if (!(this.props.instance instanceof BaseModel)) {
            return (
                <ErrorPage message={PAGE_NOT_FOUND}/>
            );
        }
        const childProps = {location: this.props.location, params: this.props.params,
                handleSubmit: this.handleSubmit, handleDelete: this.handleDelete,
                isCreatePage: isCreatePage(this.props.location.pathname), instance: this.props.instance};
        let Page: React.ComponentClass<void> = ComponentService
                .getEditPage(this.props.params.resource) as React.ComponentClass<void>;
        return(
            <Page {...childProps}/>
        );
    }
}

function mapStateToProps(state, ownProps): Object {
    let instanceType: string = isCreatePage(ownProps.location.pathname) ? 'create' : 'edit';
    let instance: BaseModel = ModelService.getModel(ownProps.params.resource)
            .get<BaseModel>(ownProps.params.resourceID, true, {}, () => {}, () => {}, instanceType as 'create' | 'edit');
    return {
        instance
    };
}

function mapDispatchToProps(dispatch) {
   return {
       createInstance: (instance) => {
           dispatch(createInstance(instance));
       }
   };
}

let EditPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPageImpl);

export {EditPage};
