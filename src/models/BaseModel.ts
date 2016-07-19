import {store} from '../store/store';
import {saveInstance, updateInstance, deleteInstance} from '../actions/instanceActions';
import {resolver} from '../resolver';
import {HTTP} from '../api/server/index';
import {InvalidInstanceDataError} from '../errors/InvalidInstanceDataError';

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
            failureCallBack = ( (...args: any[]) => {} )) {
        if (flush) {
            HTTP.postRequest(`${this.resourceName}/save`, this.instanceData)
                .then((response) => {
                    successCallBack(response);
                }, (err) => {
                    failureCallBack(err);
                });
        }
        store.dispatch(saveInstance(this));
    }

    $update(flush: boolean = true,
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} )) {
        if (flush) {
            HTTP.putRequest(`${this.resourceName}/update`, this.instanceData)
                .then((response) => {
                    successCallBack(response);
                }, (err) => {
                    failureCallBack(err);
                });
        }
        store.dispatch(updateInstance(this));
    }

    $delete(flush: boolean = true,
            successCallBack = ( (...args: any[]) => {} ),
            failureCallBack = ( (...args: any[]) => {} )) {
        if (flush) {
            HTTP.deleteRequest(`${this.resourceName}/delete/${this.instanceData.id}`)
                .then((response) => {
                    successCallBack(response);
                }, (err) => {
                    failureCallBack(err);
                });
        }
        store.dispatch(deleteInstance(this));
    }

}
