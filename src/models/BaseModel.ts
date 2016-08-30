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
    constructor(public properties) {
        let className: string = (this.constructor as Function & {name: string}).name;
        // Dynamically assigning resource name from class Name
        this.resourceName = className.substr(0, className.indexOf('Model')).toLowerCase();
        this.properties = properties;
    }

    $save(flush: boolean = true,
            key: string = '',
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} )): void {
        if (flush) {
            HTTP.postRequest(`${this.resourceName}/save`, this.properties)
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
            failureCallBack = ( (...args: any[]) => {} )): void {
        if (flush) {
            HTTP.putRequest(`${this.resourceName}/update`, this.properties)
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
            failureCallBack = ( (...args: any[]) => {} )): void {
        if (flush) {
            HTTP.deleteRequest(`${this.resourceName}/delete/${this.properties.id}`)
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

    static get(
        id: number | string,
        valueInStore: boolean = false,
        successCallBack: Function = () => {},
        failureCallBack: Function = () => {}
    ) {
        let resourceName: string = this.name.substr(0, this.name.indexOf('Model')).toLowerCase();

        if (!valueInStore) {
            // Fetch Instance Data from the server and save it in the store.
            let path: string = `${resourceName}/show/${id}`;
            store.dispatch(
                getPromiseAction(
                    FETCH_INSTANCE_DATA,
                    resourceName,
                    path,
                    {},
                    successCallBack,
                    failureCallBack
                )()
            );
        }

        let instanceData: {toJS?: Function} = store.getState().instances;
        return instanceData.toJS ? instanceData.toJS() : instanceData;
    }

}

function getPromiseAction(
    type: string,
    resource: string,
    path: string,
    filters: Object,
    successCallBack: Function,
    failureCallBack: Function) {
    return () =>
        (dispatch) => {
            return dispatch({
                type,
                payload: {
                    promise: getData(path, filters),
                },
                resource,
                successCallBack,
                failureCallBack
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
