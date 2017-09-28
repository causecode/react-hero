export declare const BASE_URL: string;
export declare function setDefaultHeader(): void;
export declare module HTTP {
    function postRequest(path: string, headers?: {}, data?: {}): Axios.IPromise<Axios.AxiosXHR<{}>>;
    function serialize(object: Object, prefix?: string): string;
    function getRequest(path: string, headers?: {}, data?: {}): Axios.IPromise<Axios.AxiosXHR<{}>>;
    function putRequest(path: string, headers?: {}, data?: {}): Axios.IPromise<Axios.AxiosXHR<{}>>;
    function deleteRequest(path: string, headers?: {}): Axios.IPromise<Axios.AxiosXHR<{}>>;
}
