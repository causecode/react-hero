import {BaseModel} from './../models/BaseModel';
import {resolver} from '../resolver';

export class BlogModel extends BaseModel {
    constructor(properties: any) {
        super(properties);
    }
}

export class UserModel extends BaseModel {
    constructor(properties: any) {
        super(properties);
        this.properties = properties;
    }
}

