import { Dictionary } from '../interfaces';
export declare class BaseModel {
    properties: any;
    key: string;
    static resourceName: string;
    resourceName: string;
    static propTypes: Dictionary<any>;
    static columnNames: any;
    static defaultProps: Dictionary<any>;
    constructor(properties: any);
    readonly columnNames: any;
    readonly propTypes: any;
    static getResourceName(): string;
    $save(flush?: boolean, headers?: Object, successCallBack?: (...args: any[]) => void, failureCallBack?: (...args: any[]) => void, path?: string): void;
    $update(flush?: boolean, headers?: Object, successCallBack?: (...args: any[]) => void, failureCallBack?: (...args: any[]) => void, path?: string): void;
    $delete(flush?: boolean, headers?: Object, successCallBack?: (...args: any[]) => void, failureCallBack?: (...args: any[]) => void, path?: string): void;
    static unsetList(): void;
    static list(filters?: {}, valueInStore?: boolean, headers?: Object, successCallBack?: Function, failureCallBack?: Function, path?: string, state?: {
        data?: any;
    }): any;
    static saveAll(instanceDataList: any[]): void;
    static get<T extends BaseModel>(id: string, valueInStore?: boolean, headers?: {}, successCallBack?: Function, failureCallBack?: Function, state?: {
        data?: any;
    }): T;
    static get<T extends BaseModel>(id: string, valueInStore?: boolean, headers?: {}, successCallBack?: Function, failureCallBack?: Function, state?: {
        data?: any;
    }, operation?: 'edit' | 'create'): T;
}
export declare function getData(path: string, filters?: {}, headers?: Object): Promise<{}>;
export declare class DefaultModel extends BaseModel {
    static resourceName: string;
    static propTypes: any;
    static defaultProps: {};
    constructor(properties: any);
}
