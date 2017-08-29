"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
function ModelActionFactory(type) {
    return function (instance, resource) {
        return {
            type: type,
            resource: resource,
            instance: instance,
        };
    };
}
exports.ModelActionFactory = ModelActionFactory;
exports.saveInstance = ModelActionFactory(constants_1.SAVE_INSTANCE);
exports.updateInstance = ModelActionFactory(constants_1.UPDATE_INSTANCE);
exports.deleteInstance = ModelActionFactory(constants_1.DELETE_INSTANCE);
exports.setPage = function (pageNumber, resource) {
    return {
        type: constants_1.SET_PAGE,
        resource: resource,
        pageNumber: pageNumber,
    };
};
exports.unsetList = function (resource) {
    return {
        type: constants_1.UNSET_RESOURCE_LIST,
        resource: resource,
    };
};
exports.toggleFilters = function () {
    return {
        type: constants_1.TOGGLE_FILTERS,
    };
};
exports.toggleNav = function () {
    return {
        type: constants_1.TOGGLE_NAV,
    };
};
exports.toggleSecondaryNav = function () {
    return {
        type: constants_1.TOGGLE_SECONDARY_NAV,
    };
};
exports.saveAllInstances = function (instanceList, resource) {
    return {
        type: constants_1.SAVE_ALL_INSTANCES,
        resource: resource,
        instanceList: instanceList,
    };
};
