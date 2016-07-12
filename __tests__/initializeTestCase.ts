import * as TestUtils from 'react-addons-test-utils';
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
import * as React from 'react';
interface IBeforeEachData {
    renderer: React.ShallowRenderer;
    resource: string;
}
export default function initializeTestCase(): IBeforeEachData {
    return {
        renderer: TestUtils.createRenderer(),
        resource: 'test'
    };
}
