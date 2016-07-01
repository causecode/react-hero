import resolver from '../resolver';
import {capitalizeFirstLetter} from './AppService';

declare interface Function {
    name: string
}

module ModelService {

    export function register(model: any) {
        resolver.set(model.name.toLowerCase(), model);
    }

    export function getModel(name: string) {
        name = name.toLowerCase();
        return (name.indexOf('model') === -1) ? resolver.get(`${name}model`) :resolver.get(name);
    }

    export function hasModel(name: string): boolean {
        name = name.toLowerCase();
        return (name.indexOf('model') === -1) ? resolver.has(`${name}model`) : resolver.has(name);
    }

}

export {ModelService};
