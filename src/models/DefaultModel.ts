import { BaseModel } from './BaseModel';

export class DefaultModel extends BaseModel {
    
    static resourceName: string = 'default';
    static propTypes = {};
    constructor(properties: any) {
         super(properties);
     }

}
