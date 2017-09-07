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

    static columnNames: Object[] = [{
        label: 'Id',
        accessor: 'id',
    }, {
        label: 'Name',
        accessor: 'name',
    }];

    constructor(properties: ITest) {
        super(properties);
    }
}

export const userInstance: any = {
    id: 1,
    name: 'Bruce Wayne'
};

export const userModelBruceInstance: TestModel = new TestModel(userInstance);

