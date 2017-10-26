"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
exports.AUTH_TOKEN_KEY_TIMESTAMP = 'AUTH_TOKEN_KEY_TIMESTAMP';
exports.SAVE_INSTANCE = 'SAVE_INSTANCE';
exports.UPDATE_INSTANCE = 'UPDATE_INSTANCE';
exports.DELETE_INSTANCE = 'DELETE_INSTANCE';
exports.SAVE_ALL_INSTANCES = 'SAVE_ALL_INSTANCES';
exports.FETCH_INSTANCE_DATA = 'FETCH_INSTANCE_DATA';
exports.FETCH_INSTANCE_LIST = 'FETCH_INSTANCE_LIST';
exports.FETCH_INSTANCE_DATA_START = 'FETCH_INSTANCE_DATA_START';
exports.FETCH_INSTANCE_DATA_FULFILLED = 'FETCH_INSTANCE_DATA_FULFILLED';
exports.FETCH_INSTANCE_DATA_ERROR = 'FETCH_INSTANCE_DATA_ERROR';
exports.FETCH_INSTANCE_LIST_START = 'FETCH_INSTANCE_LIST_START';
exports.FETCH_INSTANCE_LIST_FULFILLED = 'FETCH_INSTANCE_LIST_FULFILLED';
exports.FETCH_INSTANCE_LIST_ERROR = 'FETCH_INSTANCE_LIST_ERROR';
exports.SET_PAGE = 'SET_PAGE';
exports.UNSET_RESOURCE_LIST = 'UNSET_RESOURCE_LIST';
exports.TOGGLE_FILTERS = 'TOGGLE_FILTERS';
exports.TOGGLE_NAV = 'TOGGLE_NAV';
exports.TOGGLE_SECONDARY_NAV = 'TOGGLE_SECONDARY_NAV';
exports.MISSING_ACTION_PAYLOAD = 'No Data in the Action Payload. ' +
    'Please make sure you are returning an instanceList from the server.';
exports.INVALID_COMMAND_ERROR = function () {
    var optionNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        optionNames[_i] = arguments[_i];
    }
    return "The following command line arguments were not specified: " + optionNames.toString();
};
exports.INVALID_MODEL_NAME = function (modelName, modelPath) {
    return "Cannot find " + modelName + " in " + modelPath;
};
exports.MISSING_PARAMETER = function (paramName, functionName) {
    return paramName + " not sent in the function " + functionName;
};
exports.NO_PROP_TYPES = function (modelName) { return "Cannot instantiate " + modelName + ", No prop types defined."; };
exports.NO_DEFAULT_PROPS = function (modelName) {
    return "Cannot instantiate " + modelName + ", No defaultProps defined.";
};
exports.PAGE_NOT_FOUND = 'Page not found.';
exports.INSTANCE_NOT_FOUND = 'Instance not found.';
exports.INSTANTIATION_ERROR = 'Instantiation Failed: Trying to create a new instance of DeviceTypes. '
    + 'Please use one of the predefined Device types.';
exports.INVALID_STATE = 'Invalid State.';
exports.RESOURCE_DATA_UNINTIALIZED = function (resource) {
    return "Resource Data not initialized for resource " + resource;
};
exports.INVALID_INSTANCE = 'Invalid Instance passed to setInstance';
exports.MODEL_RESOURCE_ERROR = 'Model cannot be initialized without resourceName';
exports.MISSING_ID_IN_METHOD = function (methodName) {
    return "Cannot perform " + methodName + " when the instance does not have an id.";
};
exports.CHECK_CHECKBOX = 'CHECK_CHECKBOX';
exports.UNCHECK_CHECKBOX = 'UNCHECK_CHECKBOX';
exports.SELECT_ALL_RECORDS_ON_PAGE = 'SELECT_ALL_RECORDS_ON_PAGE';
exports.SELECT_ALL_RECORDS = 'SELECT_ALL_RECORDS';
exports.SHOW_PRIMARY_NAV = 'SHOW_PRIMARY_NAV';
exports.SHOW_SECONDARY_NAV = 'SHOW_SECONDARY_NAV';
//# sourceMappingURL=constants.js.map