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
var BaseModel_1 = require("../../models/BaseModel");
var ModelPropTypes_1 = require("../../models/ModelPropTypes");
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel(properties) {
        return _super.call(this, properties) || this;
    }
    UserModel.resourceName = 'user';
    UserModel.propTypes = {
        id: ModelPropTypes_1.ModelPropTypes.NUMBER(),
        firstName: ModelPropTypes_1.ModelPropTypes.STRING(),
        lastName: ModelPropTypes_1.ModelPropTypes.STRING(),
        age: ModelPropTypes_1.ModelPropTypes.STRING(),
    };
    UserModel.defaultProps = {
        id: 0,
        firstName: '',
        lastNAme: '',
        age: '',
    };
    UserModel.columnNames = [
        'id',
        'firstName',
        'lastName',
        'age',
    ];
    return UserModel;
}(BaseModel_1.BaseModel));
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map