"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var config_1 = require("../../config");
var appService_1 = require("../../utils/appService");
exports.BASE_URL = config_1.config.APIUrl || config_1.config.serverUrl;
function setDefaultHeader() {
    axios_1.default.defaults.headers.common['X-Auth-Token'] = appService_1.getTokenFromLocalStorage();
}
exports.setDefaultHeader = setDefaultHeader;
var HTTP;
(function (HTTP) {
    function postRequest(path, headers, data) {
        if (headers === void 0) { headers = {}; }
        if (data === void 0) { data = {}; }
        setDefaultHeader();
        return axios_1.default({
            method: 'post',
            url: exports.BASE_URL + path,
            data: data,
            headers: headers,
        });
    }
    HTTP.postRequest = postRequest;
    function serialize(object, prefix) {
        var str = [];
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                var k = prefix ? prefix + "[" + property + "]" : property, v = object[property];
                str.push(typeof v === 'object' ?
                    serialize(v, k) :
                    encodeURIComponent(k) + '=' + encodeURIComponent(v));
            }
        }
        return str.join('&');
    }
    HTTP.serialize = serialize;
    function getRequest(path, headers, data) {
        if (headers === void 0) { headers = {}; }
        if (data === void 0) { data = {}; }
        setDefaultHeader();
        var url = Object.keys(data).length ? exports.BASE_URL + path + ("?" + serialize(data)) : exports.BASE_URL + path;
        return axios_1.default({
            method: 'get',
            url: url,
            headers: headers,
        });
    }
    HTTP.getRequest = getRequest;
    function putRequest(path, headers, data) {
        if (headers === void 0) { headers = {}; }
        if (data === void 0) { data = {}; }
        setDefaultHeader();
        return axios_1.default({
            method: 'put',
            url: exports.BASE_URL + path,
            data: data,
            headers: headers,
        });
    }
    HTTP.putRequest = putRequest;
    function deleteRequest(path, headers) {
        if (headers === void 0) { headers = {}; }
        setDefaultHeader();
        return axios_1.default({
            method: 'delete',
            url: exports.BASE_URL + path,
            headers: headers,
        });
    }
    HTTP.deleteRequest = deleteRequest;
})(HTTP = exports.HTTP || (exports.HTTP = {}));
//# sourceMappingURL=index.js.map