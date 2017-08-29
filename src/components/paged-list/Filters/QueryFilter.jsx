"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var GenericFilter_1 = require("./GenericFilter");
var Field = require('redux-form').Field;
function QueryFilter(_a) {
    var placeholder = _a.placeholder, paramName = _a.paramName;
    return (<div className="query-filter">
            <Field type="text" name={paramName} component={GenericFilter_1.GenericFilter} placeholder={placeholder}/>
        </div>);
}
exports.QueryFilter = QueryFilter;
