import * as React from 'react';
import { BaseModel } from '../models/BaseModel';
import { IImmutable } from '../interfaces';
export interface IAppServiceConfig {
    alertType?: string;
    alertTimeOut?: number;
}
export declare function objectEquals<T>(obj1: Object | Array<T>, obj2: Object | Array<T>): boolean;
export declare function getEnvironment(): string;
export declare function parseWidgetDate(date: number | string | Date): string;
export declare function getInnerData(data: any, nestedPath: string): string;
export declare function isEmpty(obj: Object): boolean;
export declare function getModelString(...args: any[]): string;
export declare function getResourceParams(pathName: string): {
    resource: string;
    resourceID: string;
};
export declare function getThemedComponent(componentPath: string, componentName: string): React.ComponentClass<any>;
export declare function showWarn(message: string): void;
export declare function initializeFormWithInstance<T extends BaseModel>(instance: T, isCreate?: boolean): void;
export declare function isImmutable(obj: Object | IImmutable): obj is IImmutable;
export declare function getIn(object: Object | IImmutable, path: string, defaultValue?: Object): Object;
export declare function generateSubForm(propertyName: string, propTypes: any, model: string): JSX.Element;
export declare function generateForm<T extends BaseModel>(instance: T, isCreatePage: boolean, model?: string, propTypes?: any): JSX.Element;
export declare function getActionComponent(fileName: string): React.ComponentClass<any>;
export declare function setTokenInLocalStorage(token: string): boolean;
export declare function getTokenFromLocalStorage(): string;
export declare function removeTokenFromLocalStorage(): void;
