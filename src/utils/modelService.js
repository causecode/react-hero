"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseModel_1 = require("./../models/BaseModel");
var resolver_1 = require("../resolver");
var appService_1 = require("./appService");
var ModelService;
(function (ModelService) {
    function warn(name) {
        if (appService_1.getEnvironment() === 'development') {
            console.warn("Cannot find " + name + ", make sure you have registered it. Using Base Model instead.");
        }
    }
    function register(model) {
        resolver_1.resolver.set(model.resourceName.toLowerCase() + 'model', model);
    }
    ModelService.register = register;
    function registerAll() {
        try {
            var modules = require('../../../../app/models');
            // const modules: any = require<any>('../demo/models');
            for (var component in modules) {
                if (modules[component] && modules[component].resourceName && component.indexOf('Model') > -1) {
                    register(modules[component]);
                }
            }
        }
        catch (error) {
            appService_1.showWarn('Exported files not found in /app/models.');
        }
    }
    ModelService.registerAll = registerAll;
    function getModel(name) {
        name = name.toLowerCase();
        name = (name.indexOf('model') === -1) ? name + "model" : name;
        if (hasModel(name)) {
            return resolver_1.resolver.get(name);
        }
        else {
            warn(name);
            return BaseModel_1.DefaultModel;
        }
    }
    ModelService.getModel = getModel;
    function hasModel(name) {
        name = name.toLowerCase();
        return (name.indexOf('model') === -1) ? resolver_1.resolver.has(name + "model") : resolver_1.resolver.has(name);
    }
    ModelService.hasModel = hasModel;
})(ModelService || (ModelService = {}));
exports.ModelService = ModelService;
