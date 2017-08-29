"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectAssign = require('object-assign');
function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value.promise && typeof value.promise.then === 'function';
    }
}
function promiseMiddleware(_a) {
    var dispatch = _a.dispatch;
    return function (next) { return function (action) {
        if (!isPromise(action.payload)) {
            return next(action);
        }
        var type = action.type, payload = action.payload, resource = action.resource, successCallBack = action.successCallBack, failureCallBack = action.failureCallBack, actionParams = action.actionParams;
        var promise = payload.promise, data = payload.data;
        var PENDING = type + "_START";
        var FULFILLED = type + "_FULFILLED";
        var REJECTED = type + "_ERROR";
        /**
         * Dispatch the pending action
         */
        dispatch(objectAssign({}, { type: PENDING }, data ? { payload: data } : {}, { resource: resource }, actionParams));
        /**
         * If successful, dispatch the fulfilled action, otherwise dispatch
         * rejected action.
         */
        return promise.then(function (result) {
            dispatch(objectAssign({}, {
                type: FULFILLED,
                payload: result.data || {},
                resource: resource,
            }, actionParams));
            if (typeof successCallBack === 'function') {
                successCallBack(result);
            }
        }, function (error) {
            dispatch(objectAssign({}, {
                type: REJECTED,
                payload: error,
                resource: resource,
            }, actionParams));
            if (typeof failureCallBack === 'function') {
                failureCallBack(error);
            }
        });
    }; };
}
exports.promiseMiddleware = promiseMiddleware;
