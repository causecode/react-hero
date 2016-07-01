import BaseModel from './../models/BaseModel';
import resolver from '../resolver';

export class BlogModel extends BaseModel {
    constructor(instanceData: any) {
        super(instanceData);
        this.instanceData = instanceData;
    }
}

export class UserModel extends BaseModel {
    constructor(instanceData: any) {
        super(instanceData);
        this.instanceData = instanceData;
    }
}

