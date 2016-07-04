import resolver from '../resolver';
import {GenericListPage} from "../components/CRUD/GenericListPage";
import GenericEditPage from "../components/CRUD/GenericEditPage";
import GenericShowPage from "../components/CRUD/GenericShowPage";

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
        return hasListPage(name) ? getComponent(name, 'listPage') : GenericListPage;
    }

    export function getEditPage(name: string) {
        return hasEditPage(name) ? getComponent(name, 'editpage') : GenericEditPage;
    }

    export function getShowPage(name: string) {
        return hasShowPage(name) ? getComponent(name, 'showpage') : GenericShowPage;
    }

}

export {ComponentService};
