import {BaseModel} from '../../src/models/BaseModel';
import {ModelPropTypes} from '../../src/models/ModelPropTypes';

export interface ITest {
    id: number;
    name: string;
}

export class TestModel extends BaseModel {

    static propTypes = {
        id: ModelPropTypes.NUMBER(),
        name: ModelPropTypes.STRING()
    };

    static defaultProps = {
        id: 0,
        name: ''
    };

    static resourceName: string = 'test';

    static columnNames: string[] = [
        'id', 
        'name'
    ];
    
    constructor(properties: ITest) {
        super(properties);
    }
}

export const userBruceInstance: any = {
    id: 1,
    name: 'Bruce Wayne'
};

export const userModelBruceInstance: TestModel = new TestModel(userBruceInstance);

