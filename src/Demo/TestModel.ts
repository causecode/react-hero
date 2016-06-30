import BaseModel from './../models/BaseModel';
import resolver from '../resolver';
function Model (target: Function) {
    resolver.set('blog', target);
}

@Model
export default class BlogModel extends BaseModel {
    constructor(instanceData: any) {
        super(instanceData);
        this.instanceData = instanceData;
    }

    method1() {
        console.log('Hii I am method1');
    }
}