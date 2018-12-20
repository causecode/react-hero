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
var Status;
(function (Status) {
    Status[Status["PRESENT"] = 0] = "PRESENT";
    Status[Status["FIRED"] = 1] = "FIRED";
})(Status = exports.Status || (exports.Status = {}));
var IsCurrent;
(function (IsCurrent) {
    IsCurrent[IsCurrent["YES"] = 0] = "YES";
    IsCurrent[IsCurrent["NO"] = 1] = "NO";
})(IsCurrent = exports.IsCurrent || (exports.IsCurrent = {}));
var BlogModel = (function (_super) {
    __extends(BlogModel, _super);
    function BlogModel(properties) {
        return _super.call(this, properties) || this;
    }
    BlogModel.resourceName = 'blog';
    BlogModel.propTypes = {
        id: ModelPropTypes_1.ModelPropTypes.NUMBER(),
        author: ModelPropTypes_1.ModelPropTypes.STRING(),
        blogIMGSrc: ModelPropTypes_1.ModelPropTypes.STRING(),
        dateCreated: ModelPropTypes_1.ModelPropTypes.STRING(),
        lastUpdated: ModelPropTypes_1.ModelPropTypes.STRING(),
    };
    BlogModel.defaultProps = {
        author: '',
        blogIMGSrc: '',
        dateCreated: 0,
        lastUpdated: 0,
    };
    BlogModel.columnNames = [
        'id',
        'author',
        'dateCreated',
        'lastUpdated',
    ];
    return BlogModel;
}(BaseModel_1.BaseModel));
exports.BlogModel = BlogModel;
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
        isCurrent: IsCurrent.YES,
    },
    enabled: false,
    status: Status.PRESENT,
});
exports.blogInstance = blogInstance;
//# sourceMappingURL=BlogModel.js.map