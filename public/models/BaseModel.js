"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants_1 = require("./../constants");
var store_1 = require("../store");
var modelActions_1 = require("../actions/modelActions");
var index_1 = require("../api/server/index");
var appService_1 = require("../utils/appService");
var constants_2 = require("../constants");
var modelService_1 = require("../utils/modelService");
var modelActions_2 = require("../actions/modelActions");
var storeService_1 = require("../utils/storeService");
var constants_3 = require("../constants");
var immutable_1 = require("immutable");
var objectAssign = require('object-assign');
var getValues = require('redux-form').getValues;
var FETCH_ERR_MSG = "Request couldn't be processed.";
var BaseModel = (function () {
    function BaseModel(properties) {
        this.properties = properties;
        var propTypes = this.constructor["propTypes"];
        var defaultProps = this.constructor["defaultProps"];
        if (!propTypes) {
            throw new Error(constants_3.NO_PROP_TYPES(this.constructor.name));
        }
        if (!defaultProps) {
            throw new Error(constants_3.NO_DEFAULT_PROPS(this.constructor.name));
        }
        if (!this.constructor["resourceName"]) {
            throw new Error(constants_1.MODEL_RESOURCE_ERROR);
        }
        this.properties = appService_1.isEmpty(properties) ? defaultProps : properties;
        this.resourceName = this.constructor["resourceName"];
    }
    Object.defineProperty(BaseModel.prototype, "columnNames", {
        get: function () {
            return this.constructor.columnNames;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseModel.prototype, "propTypes", {
        get: function () {
            return this.constructor.propTypes;
        },
        enumerable: true,
        configurable: true
    });
    BaseModel.getResourceName = function () {
        if (!this.resourceName) {
            throw new Error(constants_1.MODEL_RESOURCE_ERROR);
        }
        return this.resourceName;
    };
    BaseModel.prototype.$save = function (flush, headers, successCallBack, failureCallBack) {
        var _this = this;
        if (flush === void 0) { flush = true; }
        if (headers === void 0) { headers = {}; }
        if (successCallBack === void 0) { successCallBack = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        }); }
        if (failureCallBack === void 0) { failureCallBack = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        }); }
        if (flush) {
            index_1.HTTP.postRequest("" + this.resourceName, headers, this.properties)
                .then(function (response) {
                successCallBack(response);
                _this.properties = response.data;
                store_1.store.dispatch(modelActions_1.saveInstance(_this, _this.resourceName));
            }, function (err) {
                failureCallBack(err);
            });
        }
        else {
            store_1.store.dispatch(modelActions_1.saveInstance(this, this.resourceName));
        }
    };
    BaseModel.prototype.$update = function (flush, headers, successCallBack, failureCallBack) {
        var _this = this;
        if (flush === void 0) { flush = true; }
        if (headers === void 0) { headers = {}; }
        if (successCallBack === void 0) { successCallBack = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        }); }
        if (failureCallBack === void 0) { failureCallBack = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        }); }
        if (flush) {
            if (!this.properties || !this.properties.hasOwnProperty('id')) {
                throw new Error(constants_1.MISSING_ID_IN_METHOD('$update'));
            }
            index_1.HTTP.putRequest("" + this.resourceName, headers, this.properties)
                .then(function (response) {
                successCallBack(response);
                store_1.store.dispatch(modelActions_1.updateInstance(_this, _this.resourceName));
            }, function (err) {
                failureCallBack(err);
            });
        }
        else {
            store_1.store.dispatch(modelActions_1.updateInstance(this, this.resourceName));
        }
    };
    BaseModel.prototype.$delete = function (flush, headers, successCallBack, failureCallBack) {
        var _this = this;
        if (flush === void 0) { flush = true; }
        if (headers === void 0) { headers = {}; }
        if (successCallBack === void 0) { successCallBack = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        }); }
        if (failureCallBack === void 0) { failureCallBack = (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        }); }
        if (flush) {
            if (!this.properties.hasOwnProperty('id')) {
                throw new Error(constants_1.MISSING_ID_IN_METHOD('$delete'));
            }
            index_1.HTTP.deleteRequest(this.resourceName + "/" + this.properties.id, headers)
                .then(function (response) {
                successCallBack(response);
                store_1.store.dispatch(modelActions_1.deleteInstance(_this, _this.resourceName));
            }, function (err) {
                failureCallBack(err);
            });
        }
        else {
            store_1.store.dispatch(modelActions_1.deleteInstance(this, this.resourceName));
        }
    };
    BaseModel.unsetList = function () {
        store_1.store.dispatch(modelActions_2.unsetList(this.getResourceName()));
    };
    BaseModel.list = function (filters, valueInStore, headers, successCallBack, failureCallBack, state) {
        if (filters === void 0) { filters = {}; }
        if (valueInStore === void 0) { valueInStore = false; }
        if (headers === void 0) { headers = {}; }
        if (successCallBack === void 0) { successCallBack = function () { }; }
        if (failureCallBack === void 0) { failureCallBack = function () { }; }
        var resourceName = this.getResourceName();
        if (!valueInStore) {
            var path = resourceName;
            var filterFormData = getValues(store_1.store.getState().form[resourceName + "Filters"]);
            objectAssign(filters, filterFormData);
            store_1.store.dispatch(getPromiseAction(constants_2.FETCH_INSTANCE_LIST, resourceName, path, filters, headers, successCallBack, failureCallBack)());
        }
        state = !appService_1.isEmpty(state) ? state : store_1.store.getState();
        var data = state.data || {};
        var listData = data.toJS ? data : immutable_1.fromJS(data);
        return listData.getIn([resourceName + "List", 'instanceList'], []);
    };
    BaseModel.saveAll = function (instanceDataList) {
        if (!instanceDataList || !instanceDataList.length) {
            return;
        }
        instanceDataList = instanceDataList.map(function (instanceData) {
            if (instanceData instanceof Model) {
                return instanceData;
            }
            return new Model(instanceData);
        });
        var resource = this.getResourceName();
        var Model = modelService_1.ModelService.getModel(resource);
        instanceDataList = instanceDataList.map(function (instanceData) {
            if (instanceData instanceof Model) {
                return instanceData;
            }
            return new Model(instanceData);
        });
        store_1.store.dispatch(modelActions_2.saveAllInstances(instanceDataList, resource));
    };
    BaseModel.get = function (id, valueInStore, headers, successCallBack, failureCallBack, state, operation) {
        if (valueInStore === void 0) { valueInStore = false; }
        if (successCallBack === void 0) { successCallBack = function () { }; }
        if (failureCallBack === void 0) { failureCallBack = function () { }; }
        var resourceName = this.getResourceName();
        if (!valueInStore && operation !== 'create') {
            var path = resourceName + "/" + id;
            store_1.store.dispatch(getPromiseAction(constants_2.FETCH_INSTANCE_DATA, resourceName, path, {}, headers, successCallBack, failureCallBack)());
        }
        state = !appService_1.isEmpty(state) ? state : store_1.store.getState();
        var listInstance = storeService_1.findInstanceByID(state, resourceName, id).instance;
        if (!operation) {
            return listInstance;
        }
        var formInstances = state.forms.rhForms || {};
        formInstances = formInstances.toJS ? formInstances.toJS() : formInstances;
        var instanceKey = operation === 'edit' ? resourceName + "Edit" : resourceName + "Create";
        var formInstance = formInstances[instanceKey];
        return formInstance || listInstance;
    };
    return BaseModel;
}());
exports.BaseModel = BaseModel;
function getPromiseAction(type, resource, path, filters, headers, successCallBack, failureCallBack) {
    if (headers === void 0) { headers = {}; }
    return function () {
        return function (dispatch) {
            return dispatch({
                type: type,
                payload: {
                    promise: getData(path, filters, headers),
                },
                resource: resource,
                successCallBack: successCallBack,
                failureCallBack: failureCallBack,
            });
        };
    };
}
function getData(path, filters, headers) {
    if (filters === void 0) { filters = {}; }
    if (headers === void 0) { headers = {}; }
    return new Promise(function (resolve, reject) {
        return index_1.HTTP.getRequest(path, headers, filters)
            .then(function (response) {
            resolve(response);
        })
            .then(null, function (err) {
            return reject(new Error(FETCH_ERR_MSG));
        });
    });
}
exports.getData = getData;
var DefaultModel = (function (_super) {
    __extends(DefaultModel, _super);
    function DefaultModel(properties) {
        return _super.call(this, properties) || this;
    }
    return DefaultModel;
}(BaseModel));
exports.DefaultModel = DefaultModel;
DefaultModel.resourceName = 'default';
DefaultModel.propTypes = {};
DefaultModel.defaultProps = {};
//# sourceMappingURL=BaseModel.js.map