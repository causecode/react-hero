
import {store} from '../store/store';

interface IConstructor extends Function {
    name: string
}

export default class BaseModel {
    constructor(public instanceData, public resourceName?) {
        let className: string = (this.constructor as IConstructor).name;
        if (resourceName) {
            this.resourceName = resourceName;
        } else {
            this.resourceName = className.substr(0, className.indexOf('Model')).toLowerCase(); // Dynamically assigning resource name from class Name
        }
        this.instanceData = instanceData;
    }

    $save(flush: boolean = true) {
        console.log('>> saving your Data', this);
    }

    $update(flush: boolean = true) {
        console.log('>> updating your Data', this)
    }

    $delete(flush: boolean = true) {
        console.log('>> deleting your Data', this);
    }

}