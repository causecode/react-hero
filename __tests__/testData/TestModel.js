"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel_1 = require("../../src/models/BaseModel");
var ModelPropTypes_1 = require("../../src/models/ModelPropTypes");
var TestModel = (function (_super) {
    __extends(TestModel, _super);
    function TestModel(properties) {
        return _super.call(this, properties) || this;
    }
    return TestModel;
}(BaseModel_1.BaseModel));
TestModel.propTypes = {
    id: ModelPropTypes_1.ModelPropTypes.NUMBER(),
    name: ModelPropTypes_1.ModelPropTypes.STRING()
};
TestModel.defaultProps = {
    id: 0,
    name: ''
};
TestModel.resourceName = 'test';
TestModel.columnNames = [
    'id',
    'name'
];
exports.TestModel = TestModel;
exports.userInstance = {
    id: 1,
    name: 'Bruce Wayne'
};
exports.userModelBruceInstance = new TestModel(exports.userInstance);
