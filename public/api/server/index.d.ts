import { AxiosPromise } from 'axios';
export declare const BASE_URL: string;
export declare function setDefaultHeader(): void;
export declare module HTTP {
    function postRequest(path: string, headers?: {}, data?: {}): AxiosPromise<{}>;
    function serialize(object: Object, prefix?: string): string;
    function getRequest(path: string, headers?: {}, data?: {}): AxiosPromise<{}>;
    function putRequest(path: string, headers?: {}, data?: {}): AxiosPromise<{}>;
    function deleteRequest(path: string, headers?: {}): AxiosPromise<{}>;
}
