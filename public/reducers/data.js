"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var modelService_1 = require("../utils/modelService");
var constants_1 = require("../constants");
var StoreService = require("../utils/storeService");
var constants_2 = require("../constants");
var INITIAL_STATE = immutable_1.fromJS({
    filtersOpen: false,
});
function dataReducer(state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    var Model;
    switch (action.type) {
        case constants_1.FETCH_INSTANCE_DATA_START:
            return state;
        case constants_1.FETCH_INSTANCE_DATA_FULFILLED:
            var instanceResource = action.resource || '';
            Model = modelService_1.ModelService.getModel(instanceResource);
            var instance = {};
            if (action.payload) {
                var payloadData = action.payload;
                for (var key in payloadData) {
                    if (payloadData.hasOwnProperty(key)) {
                        instance[key] = payloadData[key];
                    }
                }
            }
            else {
                throw new Error(constants_2.MISSING_ACTION_PAYLOAD);
            }
            return StoreService.setInstanceInList(state, instanceResource, new Model(instance), true);
        case constants_1.FETCH_INSTANCE_DATA_ERROR:
            return state.set(action.resource + "Edit", immutable_1.fromJS({
                hasError: true,
                isLoading: false,
            }));
        case constants_1.FETCH_INSTANCE_LIST_START:
            return state;
        case constants_1.FETCH_INSTANCE_LIST_FULFILLED:
            var listResource = action.resource || '';
            Model = modelService_1.ModelService.getModel(listResource);
            var instanceListKey = Model["instanceListKey"] || 'instanceList';
            var storeData = {};
            if (action.payload) {
                var payloadData = action.payload;
                for (var payloadKey in payloadData) {
                    if (payloadData.hasOwnProperty(payloadKey)) {
                        if (payloadKey === instanceListKey) {
                            storeData.instanceList = payloadData[payloadKey].map(function (instance) {
                                return new Model(instance);
                            });
                        }
                        else {
                            storeData[payloadKey] = payloadData[payloadKey];
                        }
                    }
                }
                storeData.hasError = false;
                storeData.isLoading = false;
            }
            else {
                throw new Error(constants_2.MISSING_ACTION_PAYLOAD);
            }
            return state.mergeIn([listResource + "List"], immutable_1.fromJS(storeData));
        case constants_1.FETCH_INSTANCE_LIST_ERROR:
            return state.set(action.resource + "List", immutable_1.fromJS({
                hasError: true,
                isLoading: false,
            }));
        case 'SAVE_ALL_INSTANCES':
            var existingInstanceList = state.getIn([action.resource + "List", 'instanceList'], []);
            var incomingInstanceList = action.instanceList || [];
            return state.setIn([action.resource + "List", 'instanceList'], existingInstanceList.concat(incomingInstanceList));
        case constants_1.SET_PAGE:
            return state.setIn([action.resource + "List", 'activePage'], action.pageNumber);
        case constants_1.TOGGLE_FILTERS:
            return state.update('filtersOpen', function (value) { return value = !value; });
        case constants_1.SAVE_INSTANCE:
            return StoreService.setAllInstances(state, action.resource, action.instance, true);
        case constants_1.UPDATE_INSTANCE:
            return StoreService.setAllInstances(state, action.resource, action.instance);
        case constants_1.DELETE_INSTANCE:
            return StoreService.deleteAllInstances(state, action.resource, action.instance);
        case constants_1.UNSET_RESOURCE_LIST:
            return state.deleteIn([action.resource + "List", 'instanceList']);
        default:
            return state;
    }
}
exports.dataReducer = dataReducer;
//# sourceMappingURL=data.js.map