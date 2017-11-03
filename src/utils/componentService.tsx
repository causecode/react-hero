import {resolver} from '../resolver';
import {GenericListPage} from '../components/CRUD/GenericListPage';
import {GenericEditPage} from '../components/CRUD/GenericEditPage';
import {GenericShowPage} from '../components/CRUD/GenericShowPage';
import {StatelessComponent, ComponentClass} from 'react';
import {getEnvironment, showWarn} from './appService';

export type ComponentType = (ComponentClass<any> | StatelessComponent<any>) & {resourceName?: string};

module ComponentService {

    function warn(name: string, type: string) {
        if (getEnvironment() === 'development') {
            console.warn(`Cannot find Component ` +
                `${name.capitalize()}${type.capitalize()}, Make sure you have registered it.` +
                ` Using Generic${type.capitalize()} instead.`);
        }
    }
    export type pageType = 'edit' | 'create' | 'list' | 'show';

    export function register(component: ComponentType, type: pageType): void {
        let name = `${component.resourceName}${type}`;
        resolver.set(name, component);
    }

    export function registerAll(): void {
        try {
            const modules: any = require<any>('../../../../app/containers');
            // const modules: any = require<any>('../demo/components');
            for (let component in modules) {
                if (modules[component]) {
                    if (modules[component].resourceName) {
                        if (component.indexOf('Edit') > -1) {
                            ComponentService.register(modules[component], 'edit');
                        } else if (component.indexOf('List') > -1) {
                            ComponentService.register(modules[component], 'list');
                        } else if (component.indexOf('Show') > -1) {
                            ComponentService.register(modules[component], 'show');
                        } else if (component.indexOf('Create') > -1) {
                            ComponentService.register(modules[component], 'create');
                        }
                    }
                }
            }
        } catch (error) {
            showWarn('Exported files not found in /app/containers.');
        }
    }

    export function getComponent(name: string, type: string = ''): ComponentType {
        if (type && type.length) {
            return resolver.get(`${name}${type}`);
        }
        return resolver.get(name);
    }

    export function hasComponent(name: string, type: string = ''): boolean {
        if (type && type.length) {
            return resolver.has(`${name}${type}`);
        }
        return resolver.has(name);
    }

    export function hasListPage(name: string): boolean {
        return hasComponent(name, 'list');
    }

    export function hasEditPage(name: string): boolean {
        return hasComponent(name, 'edit');
    }

    export function hasShowPage(name: string): boolean {
        return hasComponent(name, 'show');
    }

    export function hasCreatePage(name: string): boolean {
        return hasComponent(name, 'create');
    }

    export function getListPage(name: string): ComponentType {
        const type: string = 'list';
        if (hasListPage(name)) {
            return getComponent(name, type);
        } else {
            warn(name, type);
            return GenericListPage;
        }
    }

    export function getEditPage(name: string): ComponentType {
        const type: string = 'edit';
        if (hasEditPage(name)) {
            return getComponent(name, type);
        } else {
            warn(name, type);
            return GenericEditPage;
        }
    }

    export function getShowPage(name: string): ComponentType {
        const type: string = 'show';
        if (hasShowPage(name)) {
            return getComponent(name, type);
        } else {
            warn(name, type);
            return GenericShowPage;
        }
    }

    export function getCreatePage(name: string): ComponentType {
        const type: string = 'create';
        if (hasCreatePage(name)) {
            return getComponent(name, type);
        } else {
            warn(name, type);
            return GenericEditPage;
        }
    }

    export function getFormPage(name: string, isCreatePage: boolean): ComponentType {
        if (isCreatePage) {
            return getCreatePage(name);
        } else {
            return getEditPage(name);
        }
    }
}

export {ComponentService};
