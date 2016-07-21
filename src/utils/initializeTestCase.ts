import * as TestUtils from 'react-addons-test-utils';
import * as React from 'react';
import {BaseModel} from '../models/BaseModel';
import {IBaseModel} from '../interfaces/interfaces';

export interface IInitializerData {
    renderer: React.ShallowRenderer;
    resource: string;
    instances: {'test': IBaseModel, 'test1': IBaseModel};
    fetchInstanceData: (...args: any[]) => void;
}

export function initializeTestCase(): IInitializerData {
    return {
        renderer: TestUtils.createRenderer(),
        resource: 'test',
        instances: {'test': new BaseModel({id: '1', author: 'abc'}), 'test1': new BaseModel({id: '1', author: 'abc'})},
        fetchInstanceData: jest.fn<(...args: any[]) => void>()
    };
}
