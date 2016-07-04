import resolver from '../resolver';
import {GenericListPage} from '../components/CRUD/GenericListPage';
import GenericEditPage from '../components/CRUD/GenericEditPage';
import GenericShowPage from '../components/CRUD/GenericShowPage';

module ComponentService {

    const warn = (name: string, type: string) => console.warn('Cannot find Component ' + name + ', ' +
            'Make sure you have registered it. Using Generic ' + type.capitalize() + ' instead.');
    export function register(component: any) {
        resolver.set(component.name.toLowerCase(), component);
    }

    export function getComponent(name: string, type: string = '') {
        name = (type.length && (name.indexOf(type) === -1)) ? `${name}${type}`.toLowerCase() : name.toLowerCase();
        return resolver.get(name);
    }

    export function hasComponent(name: string, type: string = ''): boolean {
        name = (type.length && (name.indexOf(type) === -1)) ? `${name}${type}`.toLowerCase() : name.toLowerCase();
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
        const type: string = 'listpage';
        if (hasListPage(name)) {
            return getComponent(name, type);
        } else {
            warn(name, type);
            return GenericListPage;
        }
    }

    export function getEditPage(name: string) {
        const type: string = 'editpage';
        if (hasEditPage(name)) {
            return getComponent(name, type);
        } else {
            warn(name, type);
            return GenericEditPage;
        }
    }

    export function getShowPage(name: string) {
        const type: string = 'showpage';
        if (hasShowPage(name)) {
            return getComponent(name, 'showPage');
        } else {
            warn(name, type);
            return GenericShowPage;
        }
    }

}

export {ComponentService};
