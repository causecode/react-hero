import {resolver} from '../resolver';
import {BaseModel} from '../models/BaseModel';

declare interface Function {
    name: string;
}

module ModelService {

    export function register(model: (new(instanceData: JSON) => IBaseModel) & {name?: string}) {
        resolver.set(model.name.toLowerCase(), model);
    }

    export function getModel(name: string): new(instanceData) => IBaseModel {
        name = name.toLowerCase();
        name = (name.indexOf('model') === -1) ? `${name}model` : name;
        if (hasModel(name)) {
            return resolver.get(name);
        } else {
            console.warn(`Cannot find ${name}, make sure you have registered it. Using Base Model instead.`);
            return BaseModel;
        }
    }

    export function hasModel(name: string): boolean {
        name = name.toLowerCase();
        return (name.indexOf('model') === -1) ? resolver.has(`${name}model`) : resolver.has(name);
    }

}

export {ModelService};
