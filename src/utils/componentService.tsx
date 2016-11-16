import {resolver} from '../resolver';
import {GenericListPage} from '../components/CRUD/GenericListPage';
import {GenericEditPage} from '../components/CRUD/GenericEditPage';
import {GenericShowPage} from '../components/CRUD/GenericShowPage';
import {StatelessComponent, ComponentClass} from 'react';
import '../utils/appService';
import {getEnvironment} from './appService';

export type ComponentType = (ComponentClass<any> | StatelessComponent<any>) & {resourceName?: string};

module ComponentService {

    function warn(name: string, type: string) {
        if (getEnvironment() === 'development') {
            console.warn(`Cannot find Component ` +
                `${name.capitalize()}${type.capitalize()}, Make sure you have registered it.` +
                ` Using Generic${type.capitalize()} instead.`);
        }
    }

    export function register(component: ComponentType, type: 'edit' | 'create' | 'list' ) {
        let name = `${component.resourceName}${type}`;
        resolver.set(name, component);
    }

    export function registerAll(type: 'edit' | 'create', ...components: ComponentType[]) {
        components.forEach((component) => {
            register(component, type);
        });
    }

    export function getComponent(name: string, type: string = ''): ComponentType {
        name = (type.length && (name.indexOf(type) === -1)) ? `${name}${type}`.toLowerCase() : name.toLowerCase();
        return resolver.get(name);
    }

    export function hasComponent(name: string, type: string = ''): boolean {
        name = (type.length && (name.indexOf(type) === -1)) ? `${name}${type}`.toLowerCase() : name.toLowerCase();
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
}

export {ComponentService};
