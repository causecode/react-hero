import BaseModel from "./../models/BaseModel";

export default class BlogModel extends BaseModel {
    constructor(instanceData: any) {
        super(instanceData);
        this.instanceData = instanceData;
    }

    method1() {
        console.log('Hii I am method1');
    }
}