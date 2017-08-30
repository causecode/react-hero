"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var moment = require("moment");
var ModelPropTypes_1 = require("../models/ModelPropTypes");
var store_1 = require("../store");
var react_bootstrap_1 = require("react-bootstrap");
var widgets_1 = require("../components/widgets");
var immutable_1 = require("immutable");
var constants_1 = require("../constants");
var actions = require('react-redux-form').actions;
function objectEquals(obj1, obj2) {
    // Adding try catch here to avoid 'Converting circular structure to JSON' error.
    try {
        if ((obj1 instanceof Object && obj2 instanceof Object) || (obj1 instanceof Array && obj2 instanceof Array)) {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }
    }
    catch (e) {
        return obj1 === obj2;
    }
    return obj1 === obj2;
}
exports.objectEquals = objectEquals;
function getEnvironment() {
    return process.env.NODE_ENV;
}
exports.getEnvironment = getEnvironment;
function parseWidgetDate(date) {
    var timestamp = date;
    if (date instanceof Date) {
        timestamp = date.getTime();
    }
    else if (typeof date === 'string') {
        timestamp = parseInt(date, 10);
    }
    return moment(timestamp).format('YYYY-MM-DD');
}
exports.parseWidgetDate = parseWidgetDate;
function getInnerData(data, nestedPath) {
    var result = '';
    if (data) {
        nestedPath.split('.').forEach(function (item) {
            if (data) {
                if (data.constructor === Array) {
                    data.forEach(function (innerItem, index) {
                        result = result + " " + innerItem[item].toString();
                    });
                }
                else {
                    data = data[item];
                }
                if (data && data.constructor !== Array && data.constructor !== Object) {
                    result = result + " " + data;
                }
            }
        });
    }
    return result;
}
exports.getInnerData = getInnerData;
;
function isEmpty(obj) {
    return (!obj || !Object.keys(obj).length);
}
exports.isEmpty = isEmpty;
function getModelString() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return "rhForms." + args.join('.');
}
exports.getModelString = getModelString;
function getResourceParams(pathName) {
    var type = pathName.split('/');
    var resource, resourceID = '';
    if (type.length > 1) {
        resource = type[1];
        if (type[3]) {
            resourceID = type[3];
        }
    }
    return { resource: resource, resourceID: resourceID };
}
exports.getResourceParams = getResourceParams;
/**
 * Returns the themed component. If the theme name or the theme directory is not found,
 * the default component i.e. the component in the default directory is returned.
 * @function
 * @param {string} componentPath - The path of the component from your theme directory.
 * @param {string} componentName - The component name to be rendered. This is needed because require returns an Object.
 * To access the component in the Object, component name is required.
 */
function getThemedComponent(componentPath, componentName) {
    var theme = store_1.store.getState().theme;
    if (typeof theme !== 'string') {
        return fetchComponent(componentPath, componentName);
    }
    try {
        return fetchComponent(componentPath, componentName, theme);
    }
    catch (error) {
        showWarn(error + " Rendering default component");
        return fetchComponent(componentPath, componentName);
    }
}
exports.getThemedComponent = getThemedComponent;
function fetchComponent(componentPath, componentName, theme) {
    /**
     * TODO use the path of the app root directory instead of ../../../../src.
     */
    return require("../../src/" + (theme || 'default') + "/" + componentPath)["" + componentName];
    // return require(`../../../../app/${theme || 'default'}/${componentPath}`)[`${componentName}`];
}
function showWarn(message) {
    if (getEnvironment() === 'development') {
        console.warn(message);
    }
}
exports.showWarn = showWarn;
function initializeFormWithInstance(instance, isCreate) {
    if (isCreate === void 0) { isCreate = false; }
    if (isEmpty(instance) || isEmpty(instance.properties)) {
        return;
    }
    var formModelString = isCreate ? instance.resourceName + "Create" : instance.resourceName + "Edit";
    var model = getModelString(formModelString);
    store_1.store.dispatch(actions.change(model, instance));
}
exports.initializeFormWithInstance = initializeFormWithInstance;
function isImmutable(obj) {
    return obj.toJS !== undefined;
}
exports.isImmutable = isImmutable;
function getIn(object, path, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
    var immutableObject = isImmutable(object) ? object : immutable_1.fromJS(object);
    var propertyValue = immutableObject.getIn(path.split('.'), defaultValue);
    return propertyValue && propertyValue.toJS ? propertyValue.toJS() : propertyValue;
}
exports.getIn = getIn;
function generateSubForm(propertyName, propTypes, model) {
    var FormControls = Object.keys(propTypes).map(function (prop, index) {
        if (propTypes.hasOwnProperty(prop)) {
            var type = propTypes[prop].type;
            if (type === 'object') {
                type = ModelPropTypes_1.ModelPropTypes.stringInputType;
            }
            return (<widgets_1.FormInput type={propTypes[prop].type} enum={propTypes[prop].enum} key={"form-control-sub-" + propertyName + "-" + index} propertyName={prop} model={model + '.' + prop}/>);
        }
    });
    return (<react_bootstrap_1.FormGroup key={"sub-form-" + propertyName}>
            <react_bootstrap_1.Col sm={7} smOffset={2} style={{ border: '1px solid lightgrey', borderRadius: '10px', marginBottom: '20px' }}>
                <react_bootstrap_1.ControlLabel style={{ textAlign: 'left' }}>{propertyName}</react_bootstrap_1.ControlLabel>
                {FormControls}
            </react_bootstrap_1.Col>
        </react_bootstrap_1.FormGroup>);
}
exports.generateSubForm = generateSubForm;
function generateForm(instance, isCreatePage, model, propTypes) {
    if (model === void 0) { model = ''; }
    if (propTypes === void 0) { propTypes = instance.propTypes; }
    return (<div>
            {Object.keys(propTypes).map(function (prop, index) {
        var keyPath = model ? model + '.' + prop : prop;
        var propertyValue = getIn(instance.properties, keyPath);
        var type = instance.propTypes[prop].type;
        var formModelString = isCreatePage ? instance.resourceName + "Create" :
            instance.resourceName + "Edit";
        var modelString = getModelString(formModelString, 'properties', keyPath);
        if (type === ModelPropTypes_1.ModelPropTypes.objectInputType) {
            return generateSubForm(prop, getIn(instance.propTypes, keyPath).propTypes, modelString);
        }
        return (<widgets_1.FormInput type={instance.propTypes[prop].type} enum={instance.propTypes[prop].enum} key={"form-control-" + instance.resourceName + "-" + index} propertyName={prop} propertyValue={propertyValue} model={modelString}/>);
    })}
        </div>);
}
exports.generateForm = generateForm;
function getActionComponent(fileName) {
    var fileNameSplittedToWords = fileName.split('-').map(function (item) {
        return item.capitalize();
    });
    return require("../../src/components-stateful")[fileNameSplittedToWords.join('')];
}
exports.getActionComponent = getActionComponent;
;
function setTokenInLocalStorage(token) {
    if (!token) {
        console.warn('No Token sent to setTokenInLocalStorage');
        return false;
    }
    localStorage.setItem(constants_1.AUTH_TOKEN_KEY, token);
    localStorage.setItem(constants_1.AUTH_TOKEN_KEY_TIMESTAMP, new Date().toString());
    return true;
}
exports.setTokenInLocalStorage = setTokenInLocalStorage;
;
function getTokenFromLocalStorage() {
    var token = localStorage.getItem(constants_1.AUTH_TOKEN_KEY);
    if (!token) {
        return '';
    }
    return token;
}
exports.getTokenFromLocalStorage = getTokenFromLocalStorage;
;
function removeTokenFromLocalStorage() {
    localStorage.removeItem(constants_1.AUTH_TOKEN_KEY);
    localStorage.removeItem(constants_1.AUTH_TOKEN_KEY_TIMESTAMP);
}
exports.removeTokenFromLocalStorage = removeTokenFromLocalStorage;