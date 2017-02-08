"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require("../../models/BaseModel");
var ModelPropTypes_1 = require("../../models/ModelPropTypes");
(function (Status) {
    Status[Status["PRESENT"] = 0] = "PRESENT";
    Status[Status["FIRED"] = 1] = "FIRED";
})(exports.Status || (exports.Status = {}));
var Status = exports.Status;
(function (IsCurrent) {
    IsCurrent[IsCurrent["YES"] = 0] = "YES";
    IsCurrent[IsCurrent["NO"] = 1] = "NO";
})(exports.IsCurrent || (exports.IsCurrent = {}));
var IsCurrent = exports.IsCurrent;
var BlogModel = (function (_super) {
    __extends(BlogModel, _super);
    function BlogModel(properties) {
        return _super.call(this, properties) || this;
    }
    return BlogModel;
}(BaseModel_1.BaseModel));
exports.BlogModel = BlogModel;
BlogModel.resourceName = 'blog';
BlogModel.propTypes = {
    id: ModelPropTypes_1.ModelPropTypes.NUMBER(),
    author: ModelPropTypes_1.ModelPropTypes.STRING(),
    blogIMGSrc: ModelPropTypes_1.ModelPropTypes.STRING(),
    dateCreated: ModelPropTypes_1.ModelPropTypes.STRING(),
    lastUpdated: ModelPropTypes_1.ModelPropTypes.STRING(),
    name: ({
        firstname: ModelPropTypes_1.ModelPropTypes.STRING(),
        lastname: ModelPropTypes_1.ModelPropTypes.STRING()
    })
};
BlogModel.defaultProps = {
    author: '',
    blogIMGSrc: '',
    dateCreated: 0,
    lastUpdated: 0
};
BlogModel.columnNames = [
    'id',
    'author',
    'dateCreated',
    'lastUpdated',
    'name.firstname',
    'name.lastname'
];
var blogInstance = new BlogModel({
    id: 10,
    name: 'My test blog',
    dateCreated: new Date().setDate(new Date().getDate() + 10),
    guestList: ['abc', 'qwe'],
    address: {
        lineOne: 'this is line one',
        lineTwo: 'this.is line two',
        flatNumber: 12,
        current: true,
        livingSince: new Date(),
        residents: ['Nahush', 'Piyush'],
        isCurrent: IsCurrent.YES
    },
    enabled: false,
    status: Status.PRESENT,
});
exports.blogInstance = blogInstance;
//# sourceMappingURL=BlogModel.js.map