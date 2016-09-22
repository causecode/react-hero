import {store} from '../store/store';
import {saveInstance, updateInstance, deleteInstance} from '../actions/modelActions';
import {resolver} from '../resolver';
import {HTTP} from '../api/server/index';
import {InvalidInstanceDataError} from '../errors/InvalidInstanceDataError';
import {
    FETCH_INSTANCE_DATA,
    FETCH_INSTANCE_LIST,
    FETCH_INSTANCE_LIST_START,
    FETCH_INSTANCE_LIST_FULFILLED,
    FETCH_INSTANCE_LIST_ERROR,
    FETCH_INSTANCE_DATA_START,
    FETCH_INSTANCE_DATA_FULFILLED,
    FETCH_INSTANCE_DATA_ERROR
} from '../constants';
const objectAssign: any = require<any>('object-assign');
const getValues: (state: any) => any = require<{getValues: (state: any) => any}>('redux-form').getValues;
import {ModelService} from '../utils/modelService';

const FETCH_ERR_MSG = `Request couldn't be processed.`;

export class BaseModel {
    resourceName: string;
    key: string;

    constructor(public properties) {
        let className: string = (this.constructor as Function & {name: string}).name;
        // Dynamically assigning resource name from class Name
        let resource: string = className.substr(0, className.indexOf('Model'));
        this.resourceName = resource[0].toLowerCase() + resource.slice(1, resource.length);
        this.properties = properties;
    }

    $save(flush: boolean = true,
          headers: Object = {},
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} ),
            headers: Object = {}): void {
        if (flush) {
            HTTP.postRequest(`${this.resourceName}`, headers, this.properties)
                .then((response) => {
                    successCallBack(response);
                    store.dispatch(saveInstance(this, this.resourceName));
                }, (err) => {
                    failureCallBack(err);
                });
        } else {
            store.dispatch(saveInstance(this));
        }
    }

    $update(flush: boolean = true,
            headers: Object = {},
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} ),
            headers: Object = {}): void {
        if (flush) {
            HTTP.putRequest(`${this.resourceName}`, headers, this.properties)
                .then((response) => {
                    successCallBack(response);
                    store.dispatch(updateInstance(this, this.resourceName));
                }, (err) => {
                    failureCallBack(err);
                });
        } else {
            store.dispatch(updateInstance(this));
        }
    }

    $delete(flush: boolean = true,
            headers: Object = {},
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} ),
            headers: Object = {}): void {
        if (flush) {
            HTTP.deleteRequest(`${this.resourceName}/${this.properties.id}`, headers)
                .then((response) => {
                    successCallBack(response);
                    store.dispatch(deleteInstance(this, this.resourceName));
                }, (err) => {
                    failureCallBack(err);
                });
        } else {
            store.dispatch(deleteInstance(this));
        }
    }

    static list(
        filters = {},
        valueInStore: boolean = false,
        successCallBack: Function = () => {},
        failureCallBack: Function = () => {}
    ) {
        let resourceName: string = this.name.substr(0, this.name.indexOf('Model')).toLowerCase();
        resourceName = resourceName[0].toLowerCase() + resourceName.slice(1, resourceName.length);

            if (!valueInStore) {
                // Fetch list data from server and save it in the store followed by returning it.
                let path: string = resourceName;
                let filterFormData = getValues(store.getState().form.dynamic);
                objectAssign(filters, filterFormData);
                store.dispatch(
                    getPromiseAction(
                        FETCH_INSTANCE_LIST,
                        resourceName,
                        path,
                        filters,
                        successCallBack,
                        failureCallBack
                    )()
                );
            }

        // Fetch list from store.
        let listData = store.getState().data;
        return listData.toJS ? listData.toJS() : listData;
    }

    static get<T>(
        id: string,
        valueInStore?: boolean,
        successCallBack?: Function,
        failureCallBack?: Function
    ): T;
    static get<T>(
        id: string,
        valueInStore?: boolean,
        successCallBack?: Function,
        failureCallBack?: Function,
        instanceType?: 'edit' | 'create'
    ): T;
    static get<T>(
        id: string,
        valueInStore: boolean = false,
        successCallBack: Function = () => {},
        failureCallBack: Function = () => {},
        instanceType?: 'edit' | 'create'
    ): T {
        let resourceName: string = this.name.substr(0, this.name.indexOf('Model'));
        resourceName = resourceName[0].toLowerCase() + resourceName.slice(1, resourceName.length);
        if (!valueInStore && instanceType !== 'create') {
            // Fetch Instance Data from the server and save it in the store.
            let path: string = `${resourceName}/${id}`;
            store.dispatch(
                getPromiseAction(
                    FETCH_INSTANCE_DATA,
                    resourceName,
                    path,
                    {},
                    successCallBack,
                    failureCallBack,
                    instanceType
                )()
            );
        }

        let state = store.getState();
        let instances = state.data;
        instances = instances.toJS ? instances.toJS() : instances;
        let requiredInstance: T;
        if (instanceType === 'edit') {
            requiredInstance = instances[`${resourceName}Edit`];
        } else if (instanceType === 'create') {
            requiredInstance = instances[`${resourceName}Create`];
        } else {
            requiredInstance = ModelService.findInstanceByID<T>(state, resourceName, id).instance;
        }
        return requiredInstance;
    }

}

function getPromiseAction(
    type: string,
    resource: string,
    path: string,
    filters: Object,
    successCallBack: Function,
    failureCallBack: Function,
    instanceType: string = ''
) {
    return () =>
        (dispatch) => {
            return dispatch({
                type,
                payload: {
                    promise: getData(path, filters),
                },
                resource,
                successCallBack,
                failureCallBack,
                actionParams: {
                    isEditPageInstance: instanceType === 'edit'
                }
            });
        };
}

export function getData(path: string, filters = {}): Promise<{}> {
    return new Promise((resolve, reject) => {
        return HTTP.getRequest(path, filters)
            .then<void>((response) => {
                resolve(response);
            })
            .then<void>(null, (err) =>
                reject(new Error(FETCH_ERR_MSG))
            );
    });
}
