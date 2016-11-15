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
        dateCreated: ModelPropTypes.DATE(),
        guestList: ModelPropTypes.ARRAY(ModelPropTypes.STRING()),
        id: ModelPropTypes.NUMBER(),
        name: ModelPropTypes.STRING(),
        enabled: ModelPropTypes.BOOLEAN(),
        status: ModelPropTypes.ENUM(Status),
        address: ModelPropTypes.OBJECT({
            lineOne: ModelPropTypes.STRING(),
            lineTwo: ModelPropTypes.STRING(),
            flatNumber: ModelPropTypes.NUMBER(),
            current: ModelPropTypes.BOOLEAN(),
            livingSince: ModelPropTypes.DATE(),
            residents: ModelPropTypes.ARRAY(ModelPropTypes.STRING()),
            isCurrent: ModelPropTypes.ENUM(IsCurrent)
        })
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
        name: ModelPropTypes.STRING()
    };

    constructor(properties: any) {
        super(properties);
        this.properties = properties;
    }
}
