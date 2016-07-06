/// <reference path="../interfaces/IBaseModel.d.ts" />
import {store} from '../store/store';
import {saveInstance, updateInstance, deleteInstance} from '../actions/instanceActions';
import {resolver} from '../resolver';

export default class BaseModel implements IBaseModel {
    resourceName: string;
    constructor(public instanceData) {
        let className: string = (this.constructor as IFunction).name;
        // Dynamically assigning resource name from class Name
        this.resourceName = className.substr(0, className.indexOf('Model')).toLowerCase();
        this.instanceData = instanceData;
    }

    $save(flush: boolean = true) {
        //  console.log('>> saving your Data', this);
        store.dispatch(saveInstance(this));
    }

    $update(flush: boolean = true) {
        // console.log('>> updating your Data', this);
        store.dispatch(updateInstance(this));
    }

    $delete(flush: boolean = true) {
        // console.log('>> deleting your Data', this);
        store.dispatch(deleteInstance(this));
    }

}
