declare interface IBaseModel {
    instanceData: any;
    resourceName: string;
}

declare interface String {
    capitalize(): string;
}

declare type Stub = (...args: any[]) => void ;

declare interface IShallowTestUtils {
    findAll: any;
    findAllWithClass: any;
    findAllWithType: any;
    findWithClass: any;
    findWithRef: any;
    findWithType: any;
    isComponentOfType: any;
    isDOMComponent: any;
}
