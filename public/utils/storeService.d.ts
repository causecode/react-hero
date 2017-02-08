import { BaseModel } from '../models/BaseModel';
export declare function deleteInstanceInList<T extends BaseModel>(state: any, resource: string, instance: T): any;
export declare function getInstanceList(state: any, resource: string): any;
export declare function getResourceData(state: any, resource: string): any;
export declare function setInstanceInList<T extends BaseModel>(state: any, resource: string, instance: T, force?: boolean): any;
export declare function validateState(state: any): void;
export declare function deleteAllInstances<T extends BaseModel>(state: any, resource: string, instance: T): any;
export declare function setAllInstances<T extends BaseModel>(state: any, resource: string, instance: T, force?: boolean): any;
export declare function findInstanceByID<T>(state: any, resource: string, id: string): {
    instance: T;
    index: number;
};
export declare function findInstanceInList<T>(instanceList: T[], id: string): {
    instance: T;
    index: number;
};
export declare function setInstanceList<T extends BaseModel>(state: any, resource: string, instanceList: T[]): any;
export declare function setEditInstance<T extends BaseModel>(state: any, resource: string, instance: T): any;
export declare function getEditInstance<T extends BaseModel>(state: any, resource: string): any;
export declare function setCreateInstance<T extends BaseModel>(state: any, resource: string, instance: T): any;
export declare function getCreateInstance(state: any, resource: string): any;
