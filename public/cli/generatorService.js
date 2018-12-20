"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var TemplateService = require("./templateService");
var commandLine_1 = require("./commandLine");
var constants_1 = require("../constants");
var projectConfig_1 = require("./projectConfig");
function getEditPage(pageType) {
    TemplateService.parseOptions('modelPath', 'modelName', 'onCancel');
    var modelModule = require("" + projectConfig_1.projectRoot + projectConfig_1.typescriptOut + commandLine_1.commandLine.modelPath);
    var ModelClass = modelModule[commandLine_1.commandLine.modelName.capitalize() + "Model"];
    if (!ModelClass) {
        throw new Error(constants_1.INVALID_MODEL_NAME(commandLine_1.commandLine.modelName, commandLine_1.commandLine.modelPath));
    }
    var resourceName = ModelClass.resourceName;
    var fileName = "" + resourceName.capitalize() + (pageType === 'create' ? 'Create' : 'Edit') + ".tsx";
    var filePath = projectConfig_1.projectRoot + "/app/containers/" + resourceName + "/" + fileName;
    TemplateService.writeFile(path.join(__dirname, filePath), TemplateService.generateFormPage(ModelClass, pageType), function () { });
    console.log(fileName + " File created at app/containers/" + ModelClass.resourceName + "/");
}
exports.getEditPage = getEditPage;
function getListPage() {
    TemplateService.parseOptions('modelName', 'modelPath');
    var modelModule = require("" + projectConfig_1.projectRoot + projectConfig_1.typescriptOut + commandLine_1.commandLine.modelPath);
    var ModelClass = modelModule[commandLine_1.commandLine.modelName.capitalize() + "Model"];
    if (!ModelClass) {
        throw new Error(constants_1.INVALID_MODEL_NAME(commandLine_1.commandLine.modelName, commandLine_1.commandLine.modelPath));
    }
    var resourceName = ModelClass.resourceName;
    TemplateService.writeFile(path.join(__dirname, projectConfig_1.projectRoot + "/app/containers/" + resourceName + "/" + resourceName.capitalize() + "List.tsx"), TemplateService.getListPage(ModelClass), function () { });
    console.log(resourceName.capitalize() + "List.tsx File created at app/containers/" + resourceName + "/");
}
exports.getListPage = getListPage;
function getShowPage() {
    TemplateService.parseOptions('modelPath', 'modelName');
    var modelModule = require("" + projectConfig_1.projectRoot + projectConfig_1.typescriptOut + commandLine_1.commandLine.modelPath);
    var ModelClass = modelModule[commandLine_1.commandLine.modelName.capitalize() + "Model"];
    if (!ModelClass) {
        throw new Error(constants_1.INVALID_MODEL_NAME(commandLine_1.commandLine.modelName, commandLine_1.commandLine.modelPath));
    }
    var resourceName = ModelClass.resourceName;
    TemplateService.writeFile(path.join(__dirname, projectConfig_1.projectRoot + "/app/containers/" + resourceName + "/" + resourceName.capitalize() + "Show.tsx"), TemplateService.getShowPage(ModelClass), function () { });
    console.log(resourceName.capitalize() + "Show.tsx File created at app/containers/" + resourceName + "/");
}
exports.getShowPage = getShowPage;
function generateAll() {
    getEditPage('edit');
    getEditPage('create');
    getShowPage();
    getListPage();
}
exports.generateAll = generateAll;
//# sourceMappingURL=generatorService.js.map