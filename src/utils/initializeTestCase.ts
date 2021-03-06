import * as React from 'react';
import {BaseModel, DefaultModel} from '../models/BaseModel';
export const TestUtils = require<any>('react-dom/test-utils');

export interface IInitializerData {
    renderer: any;
    resource: string;
    instances: {'test': BaseModel, 'test1': BaseModel};
    fetchInstanceData: (...args: any[]) => void;
}

export function initializeTestCase(): IInitializerData {
    return {
        renderer: TestUtils.createRenderer(),
        resource: 'test',
        instances: {
            'test': new DefaultModel({id: '1', author: 'abc'}), 
            'test1': new DefaultModel({id: '1', author: 'abc'}),
        },
        fetchInstanceData: jest.fn<(...args: any[]) => void>(),
    };
}
