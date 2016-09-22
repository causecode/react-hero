import {resolver} from '../resolver';
import {BaseModel} from '../models/BaseModel';
import {getEnvironment} from './appService';

module ModelService {

    function warn(name) {
        if (getEnvironment() === 'development') {
            console.warn(`Cannot find ${name}, make sure you have registered it. Using Base Model instead.`);
        }
    }

    export function register(model: typeof BaseModel): void {
        resolver.set(model.name.toLowerCase(), model);
    }

    export function registerAll(...models: typeof BaseModel[]): void {
        models.forEach((model) => {
            register(model);
        });
    }

    export function getModel(name: string): typeof BaseModel {
        name = name.toLowerCase();
        name = (name.indexOf('model') === -1) ? `${name}model` : name;
        if (hasModel(name)) {
            return resolver.get(name);
        } else {
            warn(name);
            return BaseModel;
        }
    }

    export function hasModel(name: string): boolean {
        name = name.toLowerCase();
        return (name.indexOf('model') === -1) ? resolver.has(`${name}model`) : resolver.has(name);
    }

    export function findInstanceByID<T>(state: any, resource: string, id: string): {instance: T, index: number} {
        /*
         * Since the instances will always be inside the data key inside the store. This if block will add
         * compatibility for us inside and outside of a reducer.
         */
        if (state.data) {
            state = state.data.toJS ? state.data.toJS() : state.data;
        }
        let resourceList = state[`${resource}List`];
        let instanceList: T[] =  resourceList && resourceList.instanceList ? resourceList.instanceList : [];

        return findInstanceInList(instanceList, id);
    }

    export function findInstanceInList<T>(instanceList: T[], id: string) {
        let requiredInstance: T;
        let index: number = -1;
        instanceList.every((instance, i) => {
            // Access properties via string literal because type T does not have a property named properties.
            let properties = instance[`properties`];
            if (!properties || !properties.id) {
                return true; // continue to next instance.
            }
            if (properties.id === id) {
                requiredInstance = instance;
                index = i;
                return false; // stop looping.
            }
        });

        return {instance: requiredInstance, index};
    }

}

export {ModelService};
