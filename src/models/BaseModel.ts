import {MODEL_RESOURCE_ERROR, MISSING_ID_IN_METHOD} from './../constants';
import {saveInstance, updateInstance, deleteInstance} from '../actions/modelActions';
import {HTTP} from '../api/server';
import {isEmpty} from '../utils/appService';
import {FETCH_INSTANCE_DATA, FETCH_INSTANCE_LIST, NO_PROP_TYPES, NO_DEFAULT_PROPS} from '../constants';
import {ModelService} from '../utils/modelService';
import {saveAllInstances, unsetList} from '../actions/modelActions';
import {findInstanceByID} from '../utils/storeService';
import {Dictionary, IFromJS} from '../interfaces';
import {fromJS} from 'immutable';
import {store} from '../store';
const objectAssign: any = require <any> ('object-assign');
const getFormValues = require<any>('redux-form').getFormValues;

const FETCH_ERR_MSG: string = `Request couldn't be processed.`;

// TODO add generic type for the properties to be passed to BaseModel i.e. BaseModel<P>.
export class BaseModel {
    key: string;
    static resourceName: string;
    resourceName: string;

    // TODO find a way to assign a generic type to this (Assigning a dictionary type to this throws an error)
    static propTypes: Dictionary<any>;
    static columnNames: any;

    static defaultProps: Dictionary<any>;

    constructor(public properties) {
        let propTypes = this.constructor[`propTypes`];
        let defaultProps = this.constructor[`defaultProps`];

        if (!propTypes) {
            throw new Error(NO_PROP_TYPES(this.constructor.name));
        }

        if (!defaultProps) {
            throw new Error(NO_DEFAULT_PROPS(this.constructor.name));
        }

        if (!this.constructor[`resourceName`]) {
            throw new Error(MODEL_RESOURCE_ERROR);
        }

        this.properties = isEmpty(properties) ? defaultProps : properties ;
        this.resourceName = this.constructor[`resourceName`];
    }

    get columnNames(): any {
        return (this.constructor as Function & {columnNames: any}).columnNames;
    }

    get propTypes(): any {
        return (this.constructor as Function & {propTypes: any}).propTypes;
    }

    static getResourceName(): string {
        if (!this.resourceName) {
            throw new Error(MODEL_RESOURCE_ERROR);
        }
        return this.resourceName;
    }

    $save(
            flush: boolean = true,
            headers: Object = {},
            successCallBack = ((...args: any[]) => {}),
            failureCallBack = ((...args: any[]) => {}),
            path: string = this.resourceName
    ): void {
        if (flush) {
            HTTP.postRequest(path, headers, this.properties)
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

    $update(
            flush: boolean = true,
            headers: Object = {},
            successCallBack = ((...args: any[]) => {}),
            failureCallBack = ((...args: any[]) => {}),
            path: string = `${this.resourceName}/${this.properties.id}`
    ): void {
        if (flush) {
            if (!this.properties || !this.properties.hasOwnProperty('id')) {
                throw new Error(MISSING_ID_IN_METHOD('$update'));
            }
            HTTP.putRequest(path, headers, this.properties)
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

    $delete(
            flush: boolean = true,
            headers: Object = {},
            successCallBack = ((...args: any[]) => {}),
            failureCallBack = ((...args: any[]) => {}),
            path?: string
    ): void {
        if (flush) {
            if (!this.properties.hasOwnProperty('id')) {
                throw new Error(MISSING_ID_IN_METHOD('$delete'));
            }

            let requestUrl: string = path ? `path/${this.properties.id}` : `${this.resourceName}/${this.properties.id}`;

            HTTP.deleteRequest(requestUrl, headers)
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

    static unsetList(): void {
        store.dispatch(unsetList(this.getResourceName()));
    }

    static list(
        filters = {},
        valueInStore: boolean = false,
        headers: Object = {},
        successCallBack: Function = () => {},
        failureCallBack: Function = () => {},
        path: string = this.resourceName,
        state?: {data?: any}
    ) {
        let resourceName: string = this.getResourceName();

            if (!valueInStore) {
                // Fetch list data from server and save it in the store followed by returning it.
                let filterFormData: any = getFormValues(`${resourceName}Filters`)(store.getState());
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
        let data = state.data || {};
        let listData = data.toJS ? data : fromJS(data); // converting to Immutable so that getIn can be called.
        return listData.getIn([`${resourceName}List`, 'instanceList'], []);
    }

    static saveAll(instanceDataList: any[]) {
        if (!instanceDataList || !instanceDataList.length) {
            return;
        }
        instanceDataList = instanceDataList.map(instanceData => {
            if (instanceData instanceof Model) {
                return instanceData;
            }
            return new Model(instanceData);
        });

        let resource: string = this.getResourceName();
        let Model: typeof BaseModel = ModelService.getModel(resource);

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
       state?: {data?: any},
       params?: Object,
   ): T;
   static get<T extends BaseModel>(
       id: string,
       valueInStore?: boolean,
       headers?: {},
       successCallBack?: Function,
       failureCallBack?: Function,
       state?: {data?: any},
       operation?: 'edit' | 'create',
       params?: Object,
   ): T;
   static get<T extends BaseModel>(
       id: string,
       valueInStore: boolean = false,
       headers?: {},
       successCallBack: Function = () => {},
       failureCallBack: Function = () => {},
       state?: {forms?: any},
       operation?: 'edit' | 'create',
       params?: Object,
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
                   params || {},
                   headers,
                   successCallBack,
                   failureCallBack
               )()
           );
       }

        state = !isEmpty(state) ? state : store.getState();
        let listInstance = findInstanceByID<any>(state, resourceName, id).instance;
        if (!operation) {
            return listInstance;
        }

        let formInstances: IFromJS | any = state.forms.rhForms || {};
        formInstances = formInstances.toJS ? formInstances.toJS() : formInstances;
        let instanceKey: string = operation === 'edit' ? `${resourceName}Edit` : `${resourceName}Create`;
        let formInstance: any = formInstances[instanceKey];

        return formInstance || listInstance;
    }
}

function getPromiseAction(
    type: string,
    resource: string,
    path: string,
    filters: Object,
    headers: Object = {},
    successCallBack: Function,
    failureCallBack: Function
): any {
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

export class DefaultModel extends BaseModel {

    static resourceName: string = 'default';
    static propTypes: any = {};
    static defaultProps = {};
    constructor(properties: any) {
         super(properties);
     }
}
