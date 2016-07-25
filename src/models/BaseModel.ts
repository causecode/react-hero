import {store} from '../store/store';
import {saveInstance, updateInstance, deleteInstance} from '../actions/modelActions';
import {resolver} from '../resolver';
import {HTTP} from '../api/server/index';
import {InvalidInstanceDataError} from '../errors/InvalidInstanceDataError';
import {IBaseModel} from '../interfaces/interfaces';

export class BaseModel implements IBaseModel {
    resourceName: string;
    constructor(public instanceData) {
        let className: string = (this.constructor as Function & {name: string}).name;
        // Dynamically assigning resource name from class Name
        this.resourceName = className.substr(0, className.indexOf('Model')).toLowerCase();
        this.instanceData = instanceData;
    }

    $save(flush: boolean = true,
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} )): void {
        if (flush) {
            HTTP.postRequest(`${this.resourceName}/save`, this.instanceData)
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
            HTTP.putRequest(`${this.resourceName}/update`, this.instanceData)
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
            HTTP.deleteRequest(`${this.resourceName}/delete/${this.instanceData.id}`)
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

    static list() {
        return;
    }

    static get() {
        return;
    }

}
