"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelPropTypes;
(function (ModelPropTypes) {
    ModelPropTypes.dateInputType = 'date';
    ModelPropTypes.arrayInputType = 'list';
    ModelPropTypes.numberInputType = 'number';
    ModelPropTypes.stringInputType = 'text';
    ModelPropTypes.objectInputType = 'object';
    ModelPropTypes.booleanInputType = 'boolean';
    ModelPropTypes.enumInputType = 'select';
    ModelPropTypes.DATE = function () {
        return { type: ModelPropTypes.dateInputType };
    };
    ModelPropTypes.ARRAY = function (propType) {
        return { type: ModelPropTypes.arrayInputType, propType: propType };
    };
    ModelPropTypes.NUMBER = function () { return { type: ModelPropTypes.numberInputType }; };
    ModelPropTypes.STRING = function () { return { type: ModelPropTypes.stringInputType }; };
    ModelPropTypes.OBJECT = function (propTypes) { return { type: ModelPropTypes.objectInputType, propTypes: propTypes }; };
    ModelPropTypes.BOOLEAN = function () { return { type: ModelPropTypes.booleanInputType }; };
    ModelPropTypes.ENUM = function (enumInstance) {
        return { type: ModelPropTypes.enumInputType, enum: enumInstance };
    };
})(ModelPropTypes = exports.ModelPropTypes || (exports.ModelPropTypes = {}));
//# sourceMappingURL=ModelPropTypes.js.map