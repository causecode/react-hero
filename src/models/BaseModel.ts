import { MODEL_RESOURCE_ERROR, MISSING_ID_IN_METHOD } from './../constants';
import {store} from '../store/store';
import {saveInstance, updateInstance, deleteInstance} from '../actions/modelActions';
import {resolver} from '../resolver';
import {HTTP} from '../api/server/index';
import {isEmpty} from '../utils/appService';
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
import {saveAllInstances, unsetList} from '../actions/modelActions';
import {findInstanceByID} from '../utils/storeService';
import { NO_PROP_TYPES } from '../constants';

export module ModelPropTypes {
    export let DATE = () =>  { return {type: 'DATE' }; };
    export let ARRAY = () =>  { return {type: 'ARRAY' }; };
    export let NUMBER = () =>  { return {type: 'NUMBER' }; };
    export let STRING = () =>  { return {type: 'STRING' }; };
    export let OBJECT = () =>  { return {type: 'OBJECT' }; };
    export let BOOLEAN = () =>  { return {type: 'BOOLEAN' }; };
    export let ENUM = (enumInstance) => { 
        return {type: 'ENUM', enum: enumInstance}; 
    };
}

const FETCH_ERR_MSG = `Request couldn't be processed.`;

// TODO add generic type for the properties to be passed to BaseModel i.e. BaseModel<P>.
export class BaseModel {
    key: string;
    static resourceName: string;
    resourceName: string;

    static propTypes: any;

    constructor(public properties) {
        let propTypes = this.constructor[`propTypes`]; 
        if (!propTypes) {
            throw new Error(NO_PROP_TYPES(this.constructor.name));
        }
        this.properties = properties;
        if (!this.constructor[`resourceName`]) {
            throw new Error(MODEL_RESOURCE_ERROR);
        }
        this.resourceName = this.constructor[`resourceName`];
    }

    get propTypes(): {} {
        return (this.constructor as Function & {propTypes: Object}).propTypes;
    }

    static getResourceName() {
        if (!this.resourceName) {
            throw new Error(MODEL_RESOURCE_ERROR);
        }
        return this.resourceName;
    }

    $save(flush: boolean = true,
          headers: Object = {},
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} ),
            headers: Object = {}): void {
        if (flush) {
            HTTP.postRequest(`${this.resourceName}`, headers, this.properties)
                .then((response: Axios.AxiosXHR<{}>) => {
                    successCallBack(response);
                    this.properties = response.data;
                    store.dispatch(saveInstance(this, this.resourceName));
                }, (err) => {
                    failureCallBack(err);
                });
        } else {
            store.dispatch(saveInstance(this, this.resourceName));
        }
    }

    $update(flush: boolean = true,
            headers: Object = {},
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} ),
            headers: Object = {}): void {
        if (flush) {
            if (!this.properties || !this.properties.hasOwnProperty('id')) {
                throw new Error(MISSING_ID_IN_METHOD('$update'));
            }
            HTTP.putRequest(`${this.resourceName}`, headers, this.properties)
                .then((response) => {
                    successCallBack(response);
                    store.dispatch(updateInstance(this, this.resourceName));
                }, (err) => {
                    failureCallBack(err);
                });
        } else {
            store.dispatch(updateInstance(this, this.resourceName));
        }
    }

    $delete(flush: boolean = true,
            headers: Object = {},
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} ),
            headers: Object = {}): void {
        if (flush) {
            if (!this.properties.hasOwnProperty('id')) {
                throw new Error(MISSING_ID_IN_METHOD('$delete'));
            }
            HTTP.deleteRequest(`${this.resourceName}/${this.properties.id }`, headers)
                .then((response) => {
                    successCallBack(response);
                    store.dispatch(deleteInstance(this, this.resourceName));
                }, (err) => {
                    failureCallBack(err);
                });
        } else {
            store.dispatch(deleteInstance(this, this.resourceName));
        }
    }

    static unsetList() {
        store.dispatch(unsetList(this.getResourceName()));
    }

    static list(
        filters = {},
        valueInStore: boolean = false,
        headers: Object = {},
        successCallBack: Function = () => {},
        failureCallBack: Function = () => {},
        state?: {data?: any}
    ) {
        let resourceName: string = this.getResourceName();

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
                        headers,
                        successCallBack,
                        failureCallBack
                    )()
                );
            }

        // Fetch list from store.
        state = !isEmpty(state) ? state : store.getState(); 
        let listData = state.data;
        return listData.getIn([`${resourceName}List`, 'instanceList'], []);
    }

    static saveAll(instanceDataList: any[]) {
        if (!instanceDataList || !instanceDataList.length) {
            return;
        }

        let resource: string = this.getResourceName();
        let Model: typeof BaseModel = ModelService.getModel(resource);

        if (Model === BaseModel) {
            throw new Error(`Model for resource ${resource} not registered`);
        }
        instanceDataList = instanceDataList.map(instanceData => {
            if (instanceData instanceof Model) {
                return instanceData;
            }
            return new Model(instanceData);
        });

        store.dispatch(saveAllInstances(instanceDataList, resource));
    }

    static get<T extends BaseModel>(
       id: string,
       valueInStore?: boolean,
       headers?: {},
       successCallBack?: Function,
       failureCallBack?: Function,
       state?: {data?: any}
   ): T;
   static get<T extends BaseModel>(
       id: string,
       valueInStore?: boolean,
       headers?: {},
       successCallBack?: Function,
       failureCallBack?: Function,
       state?: {data?: any},
       operation?: 'edit' | 'create'
   ): T;
   static get<T extends BaseModel>(
       id: string,
       valueInStore: boolean = false,
       headers?: {},
       successCallBack: Function = () => {},
       failureCallBack: Function = () => {},
       state?: {data?: any},
       operation?: 'edit' | 'create'
   ): T {
       let resourceName: string = this.getResourceName();
       if (!valueInStore && operation !== 'create') {
           // Fetch Instance Data from the server and save it in the store.
           let path: string = `${resourceName}/${id}`;
           store.dispatch(
               getPromiseAction(
                   FETCH_INSTANCE_DATA,
                   resourceName,
                   path,
                   {},
                   headers,
                   successCallBack,
                   failureCallBack,
                   operation
               )()
           );
       }

        state = !isEmpty(state) ? state : store.getState();
        let instances = state.data;
        instances = instances.toJS ? instances.toJS() : instances;
        let requiredInstance: T;
        if (operation === 'edit') {
            requiredInstance = instances[`${resourceName}Edit`];
        } else if (operation === 'create') {
            requiredInstance = instances[`${resourceName}Create`];
        } else {
            requiredInstance = findInstanceByID<any>(state, resourceName, id).instance;
        }
        return requiredInstance;
    }

}

function getPromiseAction(
    type: string,
    resource: string,
    path: string,
    filters: Object,
    headers: Object = {},
    successCallBack: Function,
    failureCallBack: Function,
    operation: string = ''
) {
    return () =>
        (dispatch) => {
            return dispatch({
                type,
                payload: {
                    promise: getData(path, filters, headers),
                },
                resource,
                successCallBack,
                failureCallBack,
                actionParams: {
                    isEditPageInstance: operation === 'edit'
                }
            });
        };
}

export function getData(path: string, filters = {}, headers: Object = {}): Promise<{}> {
    return new Promise((resolve, reject) => {
        return HTTP.getRequest(path, headers, filters)
            .then<void>((response) => {
                resolve(response);
            })
            .then<void>(null, (err) =>
                reject(new Error(FETCH_ERR_MSG))
            );
    });
}
