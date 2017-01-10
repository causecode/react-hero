import {BaseModel} from '../../models/BaseModel';
import {ModelPropTypes} from '../../models/ModelPropTypes';

export class UserModel extends BaseModel {

    static resourceName: string = 'user';
    
    static propTypes = {
        id: ModelPropTypes.NUMBER(),
        firstName: ModelPropTypes.STRING(),
        lastName: ModelPropTypes.STRING(),
        age: ModelPropTypes.STRING()
    };
    
    static defaultProps: Object = {
        id: 0,
        firstName: '',
        lastNAme: '',
        age: ''
    };


    static columnNames: string[] = [
        'id',
        'firstName',
        'lastName',
        'age'
    ];

    constructor(properties: any) {
        super(properties);
        this.properties = properties;
    }
}
