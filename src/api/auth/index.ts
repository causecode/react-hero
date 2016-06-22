import { getRequest, post } from '../server/index';
import { IFilter } from '../../containers/PagedList';

const FETCH_ERR_MSG = `Request couldn't be processed.`;

export function fetchInstanceListFromApi(path: string, filters: IFilter) {
  return new Promise((resolve, reject) => {
    return getRequest(path, filters)
        .then((response) => {
          return resolve(response);
        })
        // .then(json => resolve(json.meta))
        .then(null, (err) => reject(new Error(FETCH_ERR_MSG)));
  });
}
