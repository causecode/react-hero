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
var React = require("react");
var react_router_1 = require("react-router");
var BaseModel_1 = require("../../src/models/BaseModel");
var ModelPropTypes_1 = require("../../src/models/ModelPropTypes");
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel(properties) {
        return _super.call(this, properties) || this;
    }
    UserModel.prototype.getHTMLName = function (instance) {
        return (<react_router_1.Link to="/stephen">Stephen Amell</react_router_1.Link>);
    };
    UserModel.prototype.getHTMLOrganization = function (instance) {
        return (<react_router_1.Link to="/queensConsolidated">Queens Consolidated</react_router_1.Link>);
    };
    return UserModel;
}(BaseModel_1.BaseModel));
UserModel.propTypes = {
    id: ModelPropTypes_1.ModelPropTypes.NUMBER(),
    name: ModelPropTypes_1.ModelPropTypes.OBJECT({
        firstName: ModelPropTypes_1.ModelPropTypes.STRING(),
        lastName: ModelPropTypes_1.ModelPropTypes.STRING(),
    }),
};
UserModel.defaultProps = {
    id: 0,
    name: {
        firstName: '',
        lastName: '',
    },
};
UserModel.resourceName = 'test';
UserModel.columnNames = [
    'id',
    'name.firstName',
    'top.secret',
    'organization',
];
exports.UserModel = UserModel;
exports.userInstance = {
    id: 1,
    name: {
        firstName: 'Stephen',
        lastName: 'Amell',
    },
};
exports.userModelStephenInstance = new UserModel(exports.userInstance);
