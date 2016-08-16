import {store} from '../store/store';
import {saveInstance, updateInstance, deleteInstance} from '../actions/modelActions';
import {resolver} from '../resolver';
import {HTTP} from '../api/server/index';
import {InvalidInstanceDataError} from '../errors/InvalidInstanceDataError';
import {
    FETCH_INSTANCE_LIST_START,
    FETCH_INSTANCE_LIST_SUCCESS,
    FETCH_INSTANCE_LIST_ERROR,
    FETCH_INSTANCE_DATA_START,
    FETCH_INSTANCE_DATA_SUCCESS,
    FETCH_INSTANCE_DATA_ERROR
} from '../constants';
const objectAssign: any = require<any>('object-assign');
const getValues: (state: any) => any = require<{getValues: (state: any) => any}>('redux-form').getValues;
import {ModelService} from '../utils/modelService';

const FETCH_ERR_MSG = `Request couldn't be processed.`;

export class BaseModel {
    resourceName: string;
    constructor(public properties) {
        let className: string = (this.constructor as Function & {name: string}).name;
        // Dynamically assigning resource name from class Name
        this.resourceName = className.substr(0, className.indexOf('Model')).toLowerCase();
        this.properties = properties;
    }

    $save(flush: boolean = true,
            key: string = '',
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} ),
            headers: Object = {}): void {
        if (flush) {
            HTTP.postRequest(`${this.resourceName}`, this.properties, headers)
                .then((response) => {
                    successCallBack(response);
                    store.dispatch(saveInstance(this));
                }, (err) => {
                    failureCallBack(err);
                });
        } else {
            store.dispatch(saveInstance(this, key));
        }
    }

    $update(flush: boolean = true,
            key: string = '',
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} ),
            headers: Object = {}): void {
        if (flush) {
            HTTP.putRequest(`${this.resourceName}`, this.properties, headers)
                .then((response) => {
                    successCallBack(response);
                    store.dispatch(updateInstance(this, key));
                }, (err) => {
                    failureCallBack(err);
                });
        } else {
            store.dispatch(updateInstance(this, key));
        }
    }

    $delete(flush: boolean = true,
            key: string = '',
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} ),
            headers: Object = {}): void {
        if (flush) {
            HTTP.deleteRequest(`${this.resourceName}/${this.properties.id}`, headers)
                .then((response) => {
                    successCallBack(response);
                    store.dispatch(deleteInstance(this));
                }, (err) => {
                    failureCallBack(err);
                });
        } else {
            store.dispatch(deleteInstance(this, key));
        }
    }

    static list(
        filters = {},
        valueInStore: boolean = false,
        successCallBack: Function = () => {},
        failureCallBack: Function = () => {}
    ) {
        let resourceName: string = this.name.substr(0, this.name.indexOf('Model')).toLowerCase();

            if (!valueInStore) {
                // Fetch list data from server and save it in the store followed by returning it.
                let types: string[] = [
                    FETCH_INSTANCE_LIST_START,
                    FETCH_INSTANCE_LIST_SUCCESS,
                    FETCH_INSTANCE_LIST_ERROR,
                ];
                let path: string = resourceName;
                let filterFormData = getValues(store.getState().form.dynamic);
                objectAssign(filters, filterFormData);
                store.dispatch(
                    getPromiseAction(
                        types,
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

    static get(
        id: number | string,
        valueInStore: boolean = false,
        successCallBack: Function = () => {},
        failureCallBack: Function = () => {}
    ) {
        let resourceName: string = this.name.substr(0, this.name.indexOf('Model')).toLowerCase();

        if (!valueInStore) {
            // Fetch Instance Data from the server and save it in the store.
            let types: string[] = [
                FETCH_INSTANCE_DATA_START,
                FETCH_INSTANCE_DATA_SUCCESS,
                FETCH_INSTANCE_DATA_ERROR,
            ];
            let path: string = `${resourceName}/${id}`;
            store.dispatch(
                getPromiseAction(
                    types,
                    resourceName,
                    path,
                    {},
                    successCallBack,
                    failureCallBack
                )()
            );
        }

        let instanceData = store.getState().instances;
        return instanceData.toJS ? instanceData.toJS() : instanceData;
    }

}

function getPromiseAction(
    types: string[],
    resource: string,
    path: string,
    filters: Object,
    successCallBack: Function,
    failureCallBack: Function) {
    return () =>
        (dispatch) => {
            return dispatch({
                types,
                payload: {
                    promise: getData(path, filters),
                },
                resource,
                successCallBack,
                failureCallBack
            });
        };
}

function getData(path: string, filters = {}): Promise<{}> {
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
