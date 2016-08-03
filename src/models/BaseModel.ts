import {store} from '../store/store';
import {saveInstance, updateInstance, deleteInstance} from '../actions/modelActions';
import {resolver} from '../resolver';
import {HTTP} from '../api/server/index';
import {InvalidInstanceDataError} from '../errors/InvalidInstanceDataError';
import {FETCH_INSTANCE_LIST_START} from '../actions/data';
import {FETCH_INSTANCE_LIST_SUCCESS} from '../actions/data';
import {FETCH_INSTANCE_LIST_ERROR} from '../actions/data';

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
            store.dispatch(saveInstance(this));
        }
    }

    $update(flush: boolean = true,
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} )): void {
        if (flush) {
            HTTP.putRequest(`${this.resourceName}/update`, this.properties)
                .then((response) => {
                    successCallBack(response);
                    store.dispatch(updateInstance(this));
                }, (err) => {
                    failureCallBack(err);
                });
        } else {
            store.dispatch(updateInstance(this));
        }
    }

    $delete(flush: boolean = true,
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
            store.dispatch(deleteInstance(this));
        }
    }

    static list(filters?): Promise<{}> {
        let resourceName: string = this.name.substr(0, this.name.indexOf('Model')).toLowerCase();
        return getList(resourceName, filters);
    }

    static get(id: number | string): Promise<{}> {
        let resourceName: string = this.name.substr(0, this.name.indexOf('Model')).toLowerCase();
        let path: string = `${resourceName}/show/${id}`;
        return getList(path);
    }

}

function getList(path: string, filters = {}): Promise<{}> {
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
