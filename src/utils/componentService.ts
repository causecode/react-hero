import {resolver} from '../resolver';
import {GenericListPage} from '../components/CRUD/GenericListPage';
import {GenericEditPage} from '../components/CRUD/GenericEditPage';
import {GenericShowPage} from '../components/CRUD/GenericShowPage';
import * as React from 'react';
import {StatelessComponent, ComponentClass, Component} from 'react';
import ReactElement = __React.ReactElement;

export type ComponentType = (ComponentClass<{}> | StatelessComponent<{}>);

module ComponentService {

    const warn = (name: string, type: string) => console.warn(`Cannot find Component ` +
            `${name.capitalize()}${type.capitalize()}, Make sure you have registered it.` +
            ` Using Generic${type.capitalize()} instead.`);

    export function register(component: ComponentType & {name?: string} ) {
        resolver.set(component.name.toLowerCase(), component);
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
        return hasComponent(name, 'listpage');
    }

    export function hasEditPage(name: string): boolean {
        return hasComponent(name, 'editpage');
    }

    export function hasShowPage(name: string): boolean {
        return hasComponent(name, 'showpage');
    }

    export function hasCreatePage(name: string): boolean {
        return hasComponent(name, 'createpage');
    }

    export function getListPage(name: string): ComponentType {
        const type: string = 'listpage';
        if (hasListPage(name)) {
            return getComponent(name, type);
        } else {
            warn(name, type);
            return GenericListPage;
        }
    }

    export function getEditPage(name: string): ComponentType {
        const type: string = 'editpage';
        if (hasEditPage(name)) {
            return getComponent(name, type);
        } else {
            warn(name, type);
            return GenericEditPage;
        }
    }

    export function getShowPage(name: string): ComponentType {
        const type: string = 'showpage';
        if (hasShowPage(name)) {
            return getComponent(name, type);
        } else {
            warn(name, type);
            return GenericShowPage;
        }
    }

    export function getCreatePage(name: string): ComponentType {
        const type: string = 'createpage';
        if (hasCreatePage(name)) {
            return getComponent(name, type);
        } else {
            warn(name, type);
            return GenericEditPage;
        }
    }
}

export {ComponentService};
