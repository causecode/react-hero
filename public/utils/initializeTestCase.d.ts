import { BaseModel } from '../models/BaseModel';
export declare const TestUtils: any;
export interface IInitializerData {
    renderer: any;
    resource: string;
    instances: {
        'test': BaseModel;
        'test1': BaseModel;
    };
    fetchInstanceData: (...args: any[]) => void;
}
export declare function initializeTestCase(): IInitializerData;
