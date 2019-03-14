"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolver_1 = require("../resolver");
var GenericListPage_1 = require("../components/CRUD/GenericListPage");
var GenericEditPage_1 = require("../components/CRUD/GenericEditPage");
var GenericShowPage_1 = require("../components/CRUD/GenericShowPage");
var appService_1 = require("./appService");
var ComponentService;
(function (ComponentService) {
    function warn(name, type) {
        if (appService_1.getEnvironment() === 'development') {
            console.warn("Cannot find Component " +
                ("" + name.capitalize() + type.capitalize() + ", Make sure you have registered it.") +
                (" Using Generic" + type.capitalize() + " instead."));
        }
    }
    function register(component, type) {
        var name = "" + component.resourceName + type;
        resolver_1.resolver.set(name, component);
    }
    ComponentService.register = register;
    function registerAll() {
        try {
            var modules = require('../../../../src/containers');
            for (var component in modules) {
                if (modules[component]) {
                    if (modules[component].resourceName) {
                        if (component.indexOf('Edit') > -1) {
                            ComponentService.register(modules[component], 'edit');
                        }
                        else if (component.indexOf('List') > -1) {
                            ComponentService.register(modules[component], 'list');
                        }
                        else if (component.indexOf('Show') > -1) {
                            ComponentService.register(modules[component], 'show');
                        }
                        else if (component.indexOf('Create') > -1) {
                            ComponentService.register(modules[component], 'create');
                        }
                    }
                }
            }
        }
        catch (error) {
            appService_1.showWarn('Exported files not found in /src/containers.');
        }
    }
    ComponentService.registerAll = registerAll;
    function getComponent(name, type) {
        if (type === void 0) { type = ''; }
        if (type && type.length) {
            return resolver_1.resolver.get("" + name + type);
        }
        return resolver_1.resolver.get(name);
    }
    ComponentService.getComponent = getComponent;
    function hasComponent(name, type) {
        if (type === void 0) { type = ''; }
        if (type && type.length) {
            return resolver_1.resolver.has("" + name + type);
        }
        return resolver_1.resolver.has(name);
    }
    ComponentService.hasComponent = hasComponent;
    function hasListPage(name) {
        return hasComponent(name, 'list');
    }
    ComponentService.hasListPage = hasListPage;
    function hasEditPage(name) {
        return hasComponent(name, 'edit');
    }
    ComponentService.hasEditPage = hasEditPage;
    function hasShowPage(name) {
        return hasComponent(name, 'show');
    }
    ComponentService.hasShowPage = hasShowPage;
    function hasCreatePage(name) {
        return hasComponent(name, 'create');
    }
    ComponentService.hasCreatePage = hasCreatePage;
    function getListPage(name) {
        var type = 'list';
        if (hasListPage(name)) {
            return getComponent(name, type);
        }
        else {
            warn(name, type);
            return GenericListPage_1.GenericListPage;
        }
    }
    ComponentService.getListPage = getListPage;
    function getEditPage(name) {
        var type = 'edit';
        if (hasEditPage(name)) {
            return getComponent(name, type);
        }
        else {
            warn(name, type);
            return GenericEditPage_1.GenericEditPage;
        }
    }
    ComponentService.getEditPage = getEditPage;
    function getShowPage(name) {
        var type = 'show';
        if (hasShowPage(name)) {
            return getComponent(name, type);
        }
        else {
            warn(name, type);
            return GenericShowPage_1.GenericShowPage;
        }
    }
    ComponentService.getShowPage = getShowPage;
    function getCreatePage(name) {
        var type = 'create';
        if (hasCreatePage(name)) {
            return getComponent(name, type);
        }
        else {
            warn(name, type);
            return GenericEditPage_1.GenericEditPage;
        }
    }
    ComponentService.getCreatePage = getCreatePage;
    function getFormPage(name, isCreatePage) {
        if (isCreatePage) {
            return getCreatePage(name);
        }
        else {
            return getEditPage(name);
        }
    }
    ComponentService.getFormPage = getFormPage;
})(ComponentService || (ComponentService = {}));
exports.ComponentService = ComponentService;
//# sourceMappingURL=componentService.js.map