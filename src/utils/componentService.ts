import resolver from '../resolver';
import {capitalizeFirstLetter} from './AppService';

module ComponentService {

    export function register(component: any) {
        resolver.set(component.name.toLowerCase(), component);
    }

    export function getComponent(name: string, type: string = '') {
        if (type.length) {
            name = (name.indexOf(type) === -1) ? `${name}${type}`.toLowerCase() : name.toLowerCase();
        } else {
            name = name.toLowerCase();
        }
        return resolver.get(name);
    }

    export function hasComponent(name: string, type: string = ''): boolean {
        if (type.length) {
            name = (name.indexOf(type) === -1) ? `${name}${type}`.toLowerCase() : name.toLowerCase();
        } else {
            name = name.toLowerCase();
        }
        return resolver.has(name);
    }

    export function hasListPage(name: string) {
        return hasComponent(name, 'listpage');
    }

    export function hasEditPage(name: string) {
        return hasComponent(name, 'editpage');
    }

    export function hasShowPage(name: string) {
        return hasComponent(name, 'showpage');
    }

    export function getListPage(name: string) {
        return getComponent(name, 'listpage');
    }

    export function getEditPage(name: string) {
        return getComponent(name, 'editpage');
    }

    export function getShowPage(name: string) {
        return getComponent(name, 'showpage');
    }

}

export {ComponentService};
