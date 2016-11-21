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
        lastUpdated: ModelPropTypes.STRING(),
        name: ({
            firstname: ModelPropTypes.STRING(),
            lastname: ModelPropTypes.STRING()
        })
    };

    static defaultProps = {
        author: '',
        blogIMGSrc: '',
        dateCreated: 0,
        lastUpdated: 0
    };

    static resourceName: string = 'blog';

    static columnNames: string[] = [
            'id',
            'author',
            'dateCreated',
            'lastUpdated',
            'name.firstname',
            'name.lastname'
        ];
        
    constructor(properties?: any) {
        super(properties);
    }
}

let blogInstance = new BlogModel({
        id: 10, 
        name: 'My test blog',
        dateCreated: new Date().setDate(new Date().getDate() + 10),
        guestList: ['abc', 'qwe'],
        address: {
            lineOne: 'this is line one', 
            lineTwo: 'this.is line two', 
            flatNumber: 12, 
            current: true, 
            livingSince: new Date(), 
            residents: ['Nahush', 'Piyush'],
            isCurrent: IsCurrent.YES 
        },
        enabled: false,
        status: Status.FIRED,
    });

export {blogInstance}

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
