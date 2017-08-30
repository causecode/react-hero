"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/models/BaseModel');
var BaseModel_1 = require("../src/models/BaseModel");
var constants_1 = require("../src/constants");
var index_1 = require("../src/api/server/index");
require("babel-polyfill");
var unroll = require('unroll');
var store = require('../src/store').store;
unroll.use(it);
describe('Test Base Model', function () {
    var successCallback, failureCallback;
    var successObject = { success: true };
    var failureObject = { success: false };
    var instanceData = { id: 1, author: 'abc' };
    var ModelInstance = new BaseModel_1.DefaultModel(instanceData);
    var headers = { token: 'dummyToken' };
    function verifyActions(type, instance) {
        return __awaiter(this, void 0, void 0, function () {
            var action;
            return __generator(this, function (_a) {
                action = store.getActions()[0];
                expect(action.type).toEqual(type);
                expect(action.instance).toEqual(instance);
                return [2 /*return*/];
            });
        });
    }
    beforeEach(function () {
        function getNewHTTPMock() {
            return jest.fn(function (path, data) {
                return new Promise(function (resolve, reject) {
                    resolve(successObject);
                });
            });
        }
        index_1.HTTP.getRequest = getNewHTTPMock();
        index_1.HTTP.postRequest = getNewHTTPMock();
        index_1.HTTP.putRequest = getNewHTTPMock();
        index_1.HTTP.deleteRequest = getNewHTTPMock();
        successCallback = jest.fn();
        failureCallback = jest.fn();
    });
    afterEach(function () {
        store.clearActions();
    });
    function testWithoutParams(instance, functionName, HTTPMethod, requestParams) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        store.clearActions();
                        return [4 /*yield*/, instance['$' + functionName]()];
                    case 1:
                        _b.sent();
                        (_a = expect(HTTPMethod)).toBeCalledWith.apply(_a, requestParams);
                        verifyActions(functionName.toUpperCase() + "_INSTANCE", instance);
                        return [2 /*return*/];
                }
            });
        });
    }
    function testWithFlush(instance, functionName, HTTPMethod, requestParams) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        store.clearActions();
                        return [4 /*yield*/, instance["$" + functionName](true, headers, successCallback, failureCallback)];
                    case 1:
                        _b.sent();
                        (_a = expect(HTTPMethod)).toBeCalledWith.apply(_a, requestParams);
                        expect(successCallback).toBeCalledWith(successObject);
                        expect(failureCallback).not.toBeCalled();
                        verifyActions(functionName.toUpperCase() + "_INSTANCE", instance);
                        return [2 /*return*/];
                }
            });
        });
    }
    function testWithFlushFalse(instance, functionName, HTTPMethod) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        store.clearActions();
                        return [4 /*yield*/, instance["$" + functionName](false)];
                    case 1:
                        _a.sent();
                        expect(HTTPMethod).not.toBeCalled();
                        verifyActions(functionName.toUpperCase() + "_INSTANCE", instance);
                        return [2 /*return*/];
                }
            });
        });
    }
    function testWithFlushFalseAndCallbacks(instance, functionName, HTTPMethod) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        store.clearActions();
                        return [4 /*yield*/, instance["$" + functionName](false, headers, successCallback, failureCallback)];
                    case 1:
                        _a.sent();
                        expect(HTTPMethod).not.toBeCalled();
                        expect(successCallback).not.toBeCalled();
                        expect(failureCallback).not.toBeCalled();
                        verifyActions(functionName.toUpperCase() + "_INSTANCE", instance);
                        return [2 /*return*/];
                }
            });
        });
    }
    function testWithFlushAndPromiseFailure(instance, functionName, HTTPMethod, requestParams) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        store.clearActions();
                        return [4 /*yield*/, instance["$" + functionName](true, headers, successCallback, failureCallback)];
                    case 1:
                        _b.sent();
                        (_a = expect(HTTPMethod)).toBeCalledWith.apply(_a, requestParams);
                        expect(failureCallback).toBeCalledWith(failureObject);
                        expect(successCallback).not.toBeCalled();
                        expect(store.getActions().length).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        });
    }
    describe('Test $save, $update and $delete method on the instance', function () {
        it('calls the Model methods without any params', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Using a new instance here since on a save call the instance properties get updated.
                    return [4 /*yield*/, testWithoutParams(new BaseModel_1.DefaultModel(instanceData), 'save', index_1.HTTP.postRequest, ["" + ModelInstance.resourceName, {}, instanceData])];
                    case 1:
                        // Using a new instance here since on a save call the instance properties get updated.
                        _a.sent();
                        return [4 /*yield*/, testWithoutParams(ModelInstance, 'update', index_1.HTTP.putRequest, ["" + ModelInstance.resourceName, {}, ModelInstance.properties])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, testWithoutParams(ModelInstance, 'delete', index_1.HTTP.deleteRequest, [ModelInstance.resourceName + "/" + ModelInstance.properties.id, {}])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls the methods with flush', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testWithFlush(new BaseModel_1.DefaultModel(instanceData), 'save', index_1.HTTP.postRequest, ["" + ModelInstance.resourceName, headers, instanceData])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, testWithFlush(ModelInstance, 'update', index_1.HTTP.putRequest, ["" + ModelInstance.resourceName, headers, ModelInstance.properties])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, testWithFlush(ModelInstance, 'delete', index_1.HTTP.deleteRequest, [ModelInstance.resourceName + "/" + ModelInstance.properties.id, headers])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls the methods with flush false', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testWithFlushFalse(ModelInstance, 'save', index_1.HTTP.postRequest)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, testWithFlushFalse(ModelInstance, 'update', index_1.HTTP.putRequest)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, testWithFlushFalse(ModelInstance, 'delete', index_1.HTTP.deleteRequest)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls the methods with flush false and callbacks', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testWithFlushFalseAndCallbacks(ModelInstance, 'save', index_1.HTTP.postRequest)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, testWithFlushFalseAndCallbacks(ModelInstance, 'update', index_1.HTTP.putRequest)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, testWithFlushFalseAndCallbacks(ModelInstance, 'delete', index_1.HTTP.deleteRequest)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls the methods with flush true and promise failure condition', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index_1.HTTP.deleteRequest = index_1.HTTP.putRequest = index_1.HTTP.postRequest = jest.fn(function (path, data) {
                            return new Promise(function (resolve, reject) {
                                reject(failureObject);
                            });
                        });
                        return [4 /*yield*/, testWithFlushAndPromiseFailure(ModelInstance, 'save', index_1.HTTP.postRequest, ["" + ModelInstance.resourceName, headers, ModelInstance.properties])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, testWithFlushAndPromiseFailure(ModelInstance, 'update', index_1.HTTP.putRequest, ["" + ModelInstance.resourceName, headers, ModelInstance.properties])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, testWithFlushAndPromiseFailure(ModelInstance, 'delete', index_1.HTTP.deleteRequest, [ModelInstance.resourceName + "/" + ModelInstance.properties.id, headers])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Tests get method.', function () {
        var id = 10;
        var innerDispatch;
        beforeEach(function () {
            innerDispatch = jest.fn();
            store.dispatch = jest.fn(function (fn) { return fn(innerDispatch); });
            store.getState = jest.fn(function () {
                return { instances: {} };
            });
        });
        it('calls the get method without valueStore. ', function () { return __awaiter(_this, void 0, void 0, function () {
            var successData, innerDispatchCall;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        successData = { success: true };
                        return [4 /*yield*/, BaseModel_1.DefaultModel.get(id.toString(), false, headers, successCallback, failureCallback, store.getState())];
                    case 1:
                        _a.sent();
                        innerDispatchCall = innerDispatch.mock.calls[0][0];
                        expect(innerDispatchCall.type).toEqual(constants_1.FETCH_INSTANCE_DATA);
                        innerDispatchCall.payload.promise.then(function (response) {
                            expect(response).toEqual(successData);
                        });
                        expect(innerDispatchCall.resource).toEqual(BaseModel_1.DefaultModel.resourceName);
                        expect(innerDispatchCall.successCallBack).toEqual(successCallback);
                        expect(innerDispatchCall.failureCallBack).toEqual(failureCallback);
                        return [2 /*return*/];
                }
            });
        }); });
        it('calls the get method with valueStore. ', function () {
            BaseModel_1.DefaultModel.get(id.toString(), true, successCallback, failureCallback);
            expect(store.getState).toBeCalled();
            expect(store.dispatch).not.toBeCalled();
        });
    });
    describe('Tests list method.', function () {
        var filters = {};
        beforeEach(function () {
            store.dispatch = jest.fn();
            store.getState = jest.fn(function () {
                return {
                    data: {},
                    form: { dynamic: {} }
                };
            });
        });
        it('calls the list method with valueStore. ', function () {
            BaseModel_1.DefaultModel.list(filters, true, successCallback, failureCallback);
            expect(store.getState).toBeCalled();
            expect(store.dispatch).not.toBeCalled();
        });
        it('calls the list method without valueStore. ', function () {
            BaseModel_1.DefaultModel.list(filters, false, successCallback, failureCallback);
            expect(store.getState).toBeCalled();
            expect(store.dispatch).toBeCalled();
        });
    });
    describe('Tests getData function ', function () {
        var incorrectPath = 'test/123';
        beforeEach(function () {
            index_1.HTTP.getRequest = jest.fn(function (path) {
                var promise = Promise.resolve({});
                return promise;
            });
        });
        unroll('successfully calls to: #path', function (done, testArgs) {
            BaseModel_1.getData(testArgs.path, {});
            expect(index_1.HTTP.getRequest).toBeCalledWith(testArgs.path, {}, {});
            expect(index_1.HTTP.getRequest).not.toBeCalledWith(incorrectPath);
            done();
        }, [
            ['path'],
            ['test'],
            ['demo/show/123']
        ]);
    });
});
