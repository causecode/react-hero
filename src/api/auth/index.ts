import { post } from '../server/index';

const FETCH_ERR_MSG = `Request couldn't be proceeded.`;

export function fetchInstanceListFromApi() {
  return new Promise((resolve, reject) => {
    return post('/blog/index', {})
        .then((response) => {
          return resolve(response);
        })
        //.then(json => resolve(json.meta))
        .then(null, (err) => reject(new Error(FETCH_ERR_MSG)));
  });
}