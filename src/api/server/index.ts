import 'whatwg-fetch';
import * as axios from 'axios';
import {config} from '../../config';

export const BASE_URL = config.serverUrl;
// export const BASE_URL = 'http://192.168.1.219:8080/be/';
// export const BASE_URL_TEMP = 'http://192.168.2.10:8090/be';        // http://localhost:8090/api/v1/blog/action/index

export module HTTP {

    import AxiosInstance = Axios.AxiosInstance;
    import IPromise = Axios.IPromise;
    import AxiosXHR = Axios.AxiosXHR;
    export function postRequest(path: string, data = {}): Promise<{}> {
        return fetch(BASE_URL + path, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json());
    }

    export function serialize(obj, prefix?) {
        let str = [];
        for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
                let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
                str.push(typeof v === 'object' ?
                    serialize(v, k) :
                encodeURIComponent(k) + '=' + encodeURIComponent(v));
            }
        }
        return str.join('&');
    }

    export function getRequest(path: string, data = {}): Promise<{}> {
        let params: string = serialize(data);
        let url: string = Object.keys(data).length ? BASE_URL + path + `?${params}` : BASE_URL + path;
        return fetch(url)
            .then(response => response.json());
    }

    export function putRequest(path: string, data = {}): IPromise<AxiosXHR<{}>> {
        return axios({
            method: 'put',
            url: BASE_URL + path,
            data: data,
        });
    }

    export function deleteRequest(path: string): IPromise<AxiosXHR<{}>> {
        return axios({
            method: 'delete',
            url: BASE_URL + path,
        });
    }

}
