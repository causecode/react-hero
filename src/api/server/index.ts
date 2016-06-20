import 'whatwg-fetch';

export const BASE_URL = 'http://localhost:8080/api';
//export const BASE_URL_TEMP = 'http://192.168.2.10:8090/be';           // http://localhost:8090/api/v1/blog/action/index
export const BASE_URL_TEMP = 'http://localhost:8080/be';

export function post(path, data) {
    // return fetch(BASE_URL + path, {
    return fetch(BASE_URL_TEMP + path, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json());
}
