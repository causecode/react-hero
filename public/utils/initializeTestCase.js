"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel_1 = require("../models/BaseModel");
exports.TestUtils = require('react-addons-test-utils');
function initializeTestCase() {
    return {
        renderer: exports.TestUtils.createRenderer(),
        resource: 'test',
        instances: {
            'test': new BaseModel_1.DefaultModel({ id: '1', author: 'abc' }),
            'test1': new BaseModel_1.DefaultModel({ id: '1', author: 'abc' }),
        },
        fetchInstanceData: jest.fn(),
    };
}
exports.initializeTestCase = initializeTestCase;
//# sourceMappingURL=initializeTestCase.js.map