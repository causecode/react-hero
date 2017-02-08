"use strict";
var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var appService = require("../utils/appService");
var commandLine_1 = require("./commandLine");
var appService_1 = require("../utils/appService");
var ModelPropTypes_1 = require("../models/ModelPropTypes");
var constants_1 = require("../constants");
var mkdirp = require('mkdirp');
require("./cliInit");
function writeFile(fpath, contents, cb) {
    mkdirp(path.dirname(fpath), function (err) {
        if (err) {
            return cb(err);
        }
        ;
        fs.writeFile(fpath, contents, cb);
    });
}
exports.writeFile = writeFile;
function parseOptions() {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        options[_i - 0] = arguments[_i];
    }
    var missingOptions = [];
    options.forEach(function (option) {
        if (option.indexOf('--') === 0) {
            option = option.slice(2);
        }
        if (!commandLine_1.commandLine[option]) {
            missingOptions.push(option);
        }
    });
    if (missingOptions.length) {
        throw new Error(constants_1.INVALID_COMMAND_ERROR.apply(void 0, missingOptions));
    }
}
exports.parseOptions = parseOptions;
function getListPage(ModelClass) {
    var resourceName = ModelClass.resourceName;
    var modelName = commandLine_1.commandLine.modelName;
    var listTemplate = _.template(require('../../templates/ListTemplate.ejs'));
    return listTemplate({
        modelName: modelName,
        resourceName: resourceName
    });
}
exports.getListPage = getListPage;
function getSubFormPage(propertyName, subPropTypes, model, resourceName) {
    var formControls = {};
    var modelName = commandLine_1.commandLine.modelName;
    var inputTemplateString = "<FormInput \n                                            type=\"<%= type%>\" " +
        "<% if (enumInstance) { %>" + " \n                                            enum={<%= enumInstance%>}<% } %>" + "\n                                            propertyName=\"<%= propertyName%>\"\n                                            model=\"<%= model%>\"    \n                                       />";
    var inputTemplate = _.template(inputTemplateString);
    Object.keys(subPropTypes).forEach(function (prop, index) {
        if (!subPropTypes.hasOwnProperty(prop)) {
            return;
        }
        var currentPropType = subPropTypes[prop];
        var enumInstance = currentPropType.enum ?
            modelName.capitalize() + "Model.propTypes." + propertyName + ".propTypes[`" + prop + "`].enum" : '';
        var templateData = {
            type: currentPropType.type,
            enumInstance: enumInstance,
            propertyName: prop,
            model: model + '.' + prop
        };
        formControls[prop] = inputTemplate(templateData);
    });
    var SubFormTemplate = _.template(require('../../templates/SubFormTemplate.ejs'));
    return SubFormTemplate({
        propertyName: propertyName,
        formControls: formControls
    });
}
function generateFormPage(ModelClass, pageType) {
    var resourceName = ModelClass.resourceName, propTypes = ModelClass.propTypes;
    var modelName = commandLine_1.commandLine.modelName;
    var formControls = {};
    var inputTemplateString = "<FormInput \n                                            type=\"<%= type%>\" " +
        "<% if (enumInstance) { %>" + " \n                                            enum={<%= enumInstance%>}<% } %>" + "\n                                            propertyName=\"<%= propertyName%>\"\n                                            model=\"<%= model%>\"    \n                                       />";
    var inputTemplate = _.template(inputTemplateString);
    var formModelString = resourceName;
    var componentName = modelName;
    if (pageType === 'edit') {
        formModelString += 'Edit';
        componentName += 'Edit';
    }
    else if (pageType === 'create') {
        formModelString += 'Create';
        componentName += 'Create';
    }
    if (!appService_1.isEmpty(propTypes)) {
        Object.keys(propTypes).forEach(function (prop, index) {
            if (!propTypes.hasOwnProperty(prop)) {
                return;
            }
            var currentPropType = propTypes[prop];
            var model = appService_1.getModelString(formModelString, 'properties', prop);
            if (currentPropType.type === 'object') {
                formControls[prop] = getSubFormPage(prop, currentPropType.propTypes, model, resourceName);
                return;
            }
            var enumInstance = currentPropType.enum ?
                modelName.capitalize() + "Model.propTypes." + prop + ".enum" : '';
            var templateData = {
                type: currentPropType.type,
                enumInstance: enumInstance,
                propertyName: prop,
                model: model
            };
            formControls[prop] = inputTemplate(templateData);
        });
    }
    var editTemplate = _.template(require('../../templates/EditTemplate.ejs'));
    return editTemplate({
        modelName: modelName,
        componentName: componentName,
        resourceName: resourceName,
        modelPath: "../.." + (commandLine_1.commandLine.modelPath[0] === '/' ? commandLine_1.commandLine.modelPath : "/" + commandLine_1.commandLine.modelPath),
        cancelDestination: commandLine_1.commandLine.onCancel,
        formControls: formControls
    });
}
exports.generateFormPage = generateFormPage;
function getNestedObjectView(propertyName, propTypes, resourceName) {
    if (appService.isEmpty(propTypes)) {
        throw new Error("Could not find propTypes while generating show Page for resource " + resourceName);
    }
    var subShowTemplate = _.template(require('../../templates/SubShowTemplate.ejs'));
    var tableRowTemplate = _.template("<tr>\n                <td><strong><%= subPropertyName%></strong></td>\n                <td>{<%= subPropertyValue%>}</td>\n            </tr>");
    var tableRowMap = {};
    Object.keys(propTypes).forEach(function (prop, index) {
        tableRowMap[prop] = tableRowTemplate({
            subPropertyName: prop,
            subPropertyValue: "instance.properties." + propertyName + "." + prop + ".toString()"
        });
    });
    return subShowTemplate({
        propertyName: propertyName,
        tableRowMap: tableRowMap
    });
}
function getShowPage(ModelClass) {
    var propTypes = ModelClass.propTypes, resourceName = ModelClass.resourceName;
    if (appService.isEmpty(propTypes)) {
        throw new Error("Could not find propTypes while generating show Page for resource " + resourceName);
    }
    var showTemplate = _.template(require('../../templates/ShowTemplate.ejs'));
    var tableRowTemplate = _.template("<tr>\n            <td><strong><%= propertyName%></strong></td>\n            <td>{<%= propertyValue%>}</td>\n            </tr>");
    var tableRowMap = {};
    Object.keys(propTypes).forEach(function (prop, index) {
        if (!propTypes.hasOwnProperty(prop)) {
            return;
        }
        var currentPropType = propTypes[prop];
        if (currentPropType.type === ModelPropTypes_1.ModelPropTypes.objectInputType) {
            tableRowMap[prop] = getNestedObjectView(prop, currentPropType.propTypes, resourceName);
            return;
        }
        tableRowMap[prop] = tableRowTemplate({
            propertyName: prop,
            propertyValue: "instance.properties." + prop + ".toString()"
        });
    });
    return showTemplate({
        modelName: commandLine_1.commandLine.modelName,
        modelPath: "../.." + (commandLine_1.commandLine.modelPath[0] === '/' ? commandLine_1.commandLine.modelPath : "/" + commandLine_1.commandLine.modelPath),
        resourceName: resourceName,
        tableRowMap: tableRowMap,
    });
}
exports.getShowPage = getShowPage;
//# sourceMappingURL=templateService.js.map