import {BaseModel} from './../models/BaseModel';
import {ModelPropTypes} from '../models/ModelPropTypes';

export enum Status {
    PRESENT,
    FIRED
}

export enum IsCurrent {
    YES,
    NO
}

export class BlogModel extends BaseModel {
    static propTypes = {
        
        id: ModelPropTypes.NUMBER(),
        author: ModelPropTypes.STRING(),
        blogIMGSrc: ModelPropTypes.STRING(),
        dateCreated: ModelPropTypes.STRING(),
        lastUpdated: ModelPropTypes.STRING()
    };

    static defaultProps = {
        author: '',
        blogIMGSrc: '',
        dateCreated: 0,
        lastUpdated: 0
    };

    static resourceName: string = 'blog';

    constructor(properties?: any) {
        super(properties);
    }
}

export class UserModel extends BaseModel {

    static resourceName: string = 'user';
    
    static defaultProps: Object = {
        name: ''
    };

    static propTypes =  {
        id: ModelPropTypes.NUMBER(),
        firstName: ModelPropTypes.STRING(),
        lastName: ModelPropTypes.STRING(),
        age: ModelPropTypes.STRING()
    };

    constructor(properties: any) {
        super(properties);
        this.properties = properties;
    }
}
