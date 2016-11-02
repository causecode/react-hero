import { DefaultModel } from './../models/DefaultModel';
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
        resolver.set(model.resourceName.toLowerCase() + 'model', model);
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
            return DefaultModel;
        }
    }

    export function hasModel(name: string): boolean {
        name = name.toLowerCase();
        return (name.indexOf('model') === -1) ? resolver.has(`${name}model`) : resolver.has(name);
    }
}

export {ModelService};
