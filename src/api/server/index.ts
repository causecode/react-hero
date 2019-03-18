import axios, {AxiosPromise} from 'axios';
import {config} from '../../config';
import {getTokenFromLocalStorage} from '../../utils/appService';

export const BASE_URL: string = config.APIUrl || config.serverUrl;

export function setDefaultHeader(): void {
    axios.defaults.headers.common['X-Auth-Token'] = getTokenFromLocalStorage();
}

export module HTTP {

    export function postRequest(path: string, headers = {}, data = {}): AxiosPromise<{}> {
        setDefaultHeader();
        return axios({
            method: 'post',
            url: BASE_URL + path,
            data,
            headers,
        });
    }

    export function serialize(object: Object, prefix?: string): string {
        let str: string[] = [];
        for (let property in object) {
            if (object.hasOwnProperty(property)) {
                let k = prefix ? `${prefix}[${property}]` : property, v = object[property];
                str.push(typeof v === 'object' ?
                    serialize(v, k) :
                encodeURIComponent(k) + '=' + encodeURIComponent(v));
            }
        }
        return str.join('&');
    }

    export function getRequest(path: string, headers = {}, data = {}): AxiosPromise<{}> {
        setDefaultHeader();
        let url: string = Object.keys(data).length ? BASE_URL + path + `?${serialize(data)}` : BASE_URL + path;
        return axios({
            method: 'get',
            url: url,
            headers,
        });
    }

    export function putRequest(path: string, headers = {}, data = {}): AxiosPromise<{}> {
        setDefaultHeader();
        return axios({
            method: 'put',
            url: BASE_URL + path,
            data: data,
            headers,
        });
    }

    export function deleteRequest(path: string, headers = {}): AxiosPromise<{}> {
        setDefaultHeader();
        return axios({
            method: 'delete',
            url: BASE_URL + path,
            headers,
        });
    }

}
