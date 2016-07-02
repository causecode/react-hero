import resolver from '../resolver';
import {capitalizeFirstLetter} from './AppService';

module ComponentService {

    export function register(component: any) {
        resolver.set(component.name.toLowerCase(), component);
    }

    export function getComponent(name: string, type: string = '') {
        name = (type.length && (name.indexOf(type) === -1)) ? `${name}${type}`.toLowerCase() : name.toLowerCase();
        if (hasComponent(name)) {
            return resolver.get(name)
        } else {
            console.warn(`Cannot find Component ${name}, Make sure you have registered it. Using Generic ${type} instead.`)
            return
        }
    }

    export function hasComponent(name: string, type: string = ''): boolean {
        name = (type.length && (name.indexOf(type) === -1)) ? `${name}${type}`.toLowerCase() : name.toLowerCase()
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
