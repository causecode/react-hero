/// <reference types="react" />
import { StatelessComponent, ComponentClass } from 'react';
export declare type ComponentType = (ComponentClass<any> | StatelessComponent<any>) & {
    resourceName?: string;
};
declare module ComponentService {
    type pageType = 'edit' | 'create' | 'list' | 'show';
    function register(component: ComponentType, type: pageType): void;
    function registerAll(): void;
    function getComponent(name: string, type?: string): ComponentType;
    function hasComponent(name: string, type?: string): boolean;
    function hasListPage(name: string): boolean;
    function hasEditPage(name: string): boolean;
    function hasShowPage(name: string): boolean;
    function hasCreatePage(name: string): boolean;
    function getListPage(name: string): ComponentType;
    function getEditPage(name: string): ComponentType;
    function getShowPage(name: string): ComponentType;
    function getCreatePage(name: string): ComponentType;
    function getFormPage(name: string, isCreatePage: boolean): ComponentType;
}
export { ComponentService };
