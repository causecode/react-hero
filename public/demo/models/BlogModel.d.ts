import { BaseModel } from '../../models/BaseModel';
import { ModelPropTypes } from '../../models/ModelPropTypes';
export declare enum Status {
    PRESENT = 0,
    FIRED = 1,
}
export declare enum IsCurrent {
    YES = 0,
    NO = 1,
}
export declare class BlogModel extends BaseModel {
    static resourceName: string;
    static propTypes: {
        id: ModelPropTypes.IPropData;
        author: ModelPropTypes.IPropData;
        blogIMGSrc: ModelPropTypes.IPropData;
        dateCreated: ModelPropTypes.IPropData;
        lastUpdated: ModelPropTypes.IPropData;
        name: {
            firstname: ModelPropTypes.IPropData;
            lastname: ModelPropTypes.IPropData;
        };
    };
    static defaultProps: {
        author: string;
        blogIMGSrc: string;
        dateCreated: number;
        lastUpdated: number;
    };
    static columnNames: string[];
    constructor(properties?: any);
}
declare let blogInstance: BlogModel;
export { blogInstance };
