"use strict";
var appService_1 = require("./appService");
var immutable_1 = require("immutable");
var constants_1 = require("../constants");
var constants_2 = require("../constants");
function deleteInstanceInList(state, resource, instance) {
    var instanceList = getInstanceList(state, resource);
    var index = findInstanceInList(instanceList, instance.properties.id).index;
    if (index >= 0) {
        instanceList.splice(index, 1);
    }
    return setInstanceList(state, resource, instanceList);
}
exports.deleteInstanceInList = deleteInstanceInList;
function getInstanceList(state, resource) {
    var resourceData = getResourceData(state, resource).toJS();
    return !appService_1.isEmpty(resourceData) && !appService_1.isEmpty(resourceData.instanceList) ? resourceData.instanceList : [];
}
exports.getInstanceList = getInstanceList;
function getResourceData(state, resource) {
    validateState(state);
    return state.get(resource + "List") || immutable_1.fromJS({});
}
exports.getResourceData = getResourceData;
function setInstanceInList(state, resource, instance, force) {
    if (force === void 0) { force = false; }
    if (!instance.properties.id) {
        throw new Error(constants_1.INVALID_INSTANCE);
    }
    var instanceList = getInstanceList(state, resource);
    var index = findInstanceInList(instanceList, instance.properties.id.toString()).index;
    if (index < 0 && force) {
        instanceList.push(instance);
    }
    else if (index >= 0) {
        instanceList[index] = instance;
    }
    return setInstanceList(state, resource, instanceList);
}
exports.setInstanceInList = setInstanceInList;
function validateState(state) {
    if (appService_1.isEmpty(state)) {
        throw new Error(constants_2.INVALID_STATE);
    }
    state = state.toJS ? state.toJS() : state;
    if (appService_1.isEmpty(state)) {
        throw new Error(constants_2.INVALID_STATE);
    }
}
exports.validateState = validateState;
function deleteAllInstances(state, resource, instance) {
    validateState(state);
    var updatedState = deleteInstanceInList(state, resource, instance);
    var editInstance = getEditInstance(updatedState, resource);
    if (!appService_1.isEmpty(editInstance) && editInstance.properties.id === instance.properties.id) {
        updatedState = state.delete(resource + "Edit");
    }
    var createInstance = getCreateInstance(updatedState, resource);
    if (!appService_1.isEmpty(createInstance) && createInstance.properties.id === instance.properties.id) {
        updatedState = state.delete(resource + "Create");
    }
    return updatedState;
}
exports.deleteAllInstances = deleteAllInstances;
function setAllInstances(state, resource, instance, force) {
    if (force === void 0) { force = false; }
    validateState(state);
    var updatedState = setInstanceInList(state, resource, instance, force);
    var editInstance = getEditInstance(updatedState, resource);
    if (!appService_1.isEmpty(editInstance) && editInstance.properties.id === instance.properties.id) {
        updatedState = setEditInstance(state, resource, instance);
    }
    var createInstance = getCreateInstance(updatedState, resource);
    if (!appService_1.isEmpty(createInstance) && createInstance.properties.id === instance.properties.id) {
        updatedState = setCreateInstance(state, resource, instance);
    }
    return updatedState;
}
exports.setAllInstances = setAllInstances;
function findInstanceByID(state, resource, id) {
    if (state.data) {
        state = state.data.toJS ? state.data.toJS() : state.data;
    }
    var resourceList = state[resource + "List"];
    var instanceList = resourceList && resourceList.instanceList ? resourceList.instanceList : [];
    return findInstanceInList(instanceList, id);
}
exports.findInstanceByID = findInstanceByID;
function findInstanceInList(instanceList, id) {
    var requiredInstance;
    var index = -1;
    instanceList.every(function (instance, i) {
        var properties = instance["properties"];
        if (!properties || !properties.id) {
            return true;
        }
        if (properties.id.toString() === id) {
            requiredInstance = instance;
            index = i;
            return false;
        }
        return true;
    });
    return { instance: requiredInstance, index: index };
}
exports.findInstanceInList = findInstanceInList;
function setInstanceList(state, resource, instanceList) {
    validateState(state);
    return state.setIn([resource + "List", 'instanceList'], instanceList);
}
exports.setInstanceList = setInstanceList;
function setEditInstance(state, resource, instance) {
    validateState(state);
    return state.set(resource + "Edit", instance);
}
exports.setEditInstance = setEditInstance;
function getEditInstance(state, resource) {
    validateState(state);
    return state.get(resource + "Edit");
}
exports.getEditInstance = getEditInstance;
function setCreateInstance(state, resource, instance) {
    validateState(state);
    return state.setIn([resource + "List", resource + "Edit"], instance);
}
exports.setCreateInstance = setCreateInstance;
function getCreateInstance(state, resource) {
    validateState(state);
    return state.get(resource + "Create");
}
exports.getCreateInstance = getCreateInstance;
//# sourceMappingURL=storeService.js.map