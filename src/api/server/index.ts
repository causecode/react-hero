import 'whatwg-fetch';

 export const BASE_URL = 'http://localhost:3000/';
// export const BASE_URL = 'http://192.168.1.219:8080/be/';
// export const BASE_URL_TEMP = 'http://192.168.2.10:8090/be';        // http://localhost:8090/api/v1/blog/action/index

export function post(path, data) {
    return fetch(BASE_URL + path, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json());
};

let serialize = function(obj, prefix?) {
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
};

export function getRequest(path: string, data = {}) {
    let params = serialize(data);
    return fetch(BASE_URL + path + `?${params}`)
          .then(response => response.json());
};
