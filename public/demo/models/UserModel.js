"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require("../../models/BaseModel");
var ModelPropTypes_1 = require("../../models/ModelPropTypes");
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel(properties) {
        return _super.call(this, properties) || this;
    }
    return UserModel;
}(BaseModel_1.BaseModel));
exports.UserModel = UserModel;
UserModel.resourceName = 'user';
UserModel.propTypes = {
    id: ModelPropTypes_1.ModelPropTypes.NUMBER(),
    firstName: ModelPropTypes_1.ModelPropTypes.STRING(),
    lastName: ModelPropTypes_1.ModelPropTypes.STRING(),
    age: ModelPropTypes_1.ModelPropTypes.STRING()
};
UserModel.defaultProps = {
    id: 0,
    firstName: '',
    lastNAme: '',
    age: ''
};
UserModel.columnNames = [
    'id',
    'firstName',
    'lastName',
    'age'
];
//# sourceMappingURL=UserModel.js.map