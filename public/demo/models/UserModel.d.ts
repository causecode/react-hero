import { BaseModel } from '../../models/BaseModel';
import { ModelPropTypes } from '../../models/ModelPropTypes';
export declare class UserModel extends BaseModel {
    static resourceName: string;
    static propTypes: {
        id: ModelPropTypes.IPropData;
        firstName: ModelPropTypes.IPropData;
        lastName: ModelPropTypes.IPropData;
        age: ModelPropTypes.IPropData;
    };
    static defaultProps: Object;
    static columnNames: string[];
    constructor(properties: any);
}
