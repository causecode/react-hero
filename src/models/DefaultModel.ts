import { BaseModel } from './BaseModel';

export class DefaultModel extends BaseModel {
    
    static resourceName: string = 'default';

    constructor(properties: any) {
         super(properties);
     }

}
