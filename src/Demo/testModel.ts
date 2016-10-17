import {BaseModel} from './../models/BaseModel';
import {resolver} from '../resolver';
import {ModelService} from '../utils/modelService';

function getProperties() {
    return {author: '', blogIMGSrc: '', dateCreated: 0, lastUpdated: 0};
}
export class BlogModel extends BaseModel {

    static resourceName:string = 'blog';
    constructor(properties: any) {
        super(Object.keys(properties).length ? properties : getProperties());
        if (Object.keys(properties).length) {
            super(properties);
        } else {
            super(this.properties);
        }
    }
}

export class UserModel extends BaseModel {

    static resourceName: string = 'user';
    constructor(properties: any) {
        super(properties);
        this.properties = properties;
    }
}
