import { BaseModel } from '../models/BaseModel';
export interface IInstanceAction {
    type: string;
    resource: string;
    instance: BaseModel;
}
export declare function ModelActionFactory(type: string): (instance: BaseModel, resource: string) => IInstanceAction;
export declare type ModelActionCreatorType = (instance: BaseModel, key?: string) => IInstanceAction;
export declare const saveInstance: ModelActionCreatorType;
export declare const updateInstance: ModelActionCreatorType;
export declare const deleteInstance: ModelActionCreatorType;
export declare const setPage: (pageNumber: number, resource: string) => {
    type: string;
    resource: string;
    pageNumber: number;
};
export declare const unsetList: (resource: string) => {
    type: string;
    resource: string;
};
export declare const toggleFilters: () => {
    type: string;
};
export declare const toggleNav: () => {
    type: string;
};
export declare const saveAllInstances: (instanceList: BaseModel[], resource: string) => {
    type: string;
    resource: string;
    instanceList: BaseModel[];
};
