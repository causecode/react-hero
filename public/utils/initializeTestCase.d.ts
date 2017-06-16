import * as React from 'react';
import { BaseModel } from '../models/BaseModel';
export interface IInitializerData {
    renderer: React.ShallowRenderer;
    resource: string;
    instances: {
        'test': BaseModel;
        'test1': BaseModel;
    };
    fetchInstanceData: (...args: any[]) => void;
}
export declare function initializeTestCase(): IInitializerData;
