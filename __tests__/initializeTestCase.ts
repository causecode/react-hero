import * as TestUtils from 'react-addons-test-utils';
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
import * as React from 'react';
import BaseModel from '../src/models/BaseModel';
export interface IInitializerData {
    renderer: React.ShallowRenderer;
    resource: string;
    instances: {'test': IBaseModel, 'test1': IBaseModel};
}
export function initializeTestCase(): IInitializerData {
    return {
        renderer: TestUtils.createRenderer(),
        resource: 'test',
        instances: {'test': new BaseModel({id: '1', author: 'abc'}), 'test1': new BaseModel({id: '1', author: 'abc'})}
    };
}
