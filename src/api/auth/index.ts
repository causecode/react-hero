import { getRequest, post } from '../server/index';
import {IFilter} from "../../components/PagedList/Filters/IFilters";

const FETCH_ERR_MSG = `Request couldn't be processed.`;

export function fetchInstanceListFromApi(path: string, offset: number) {
    return new Promise((resolve, reject) => {
        let filters = {offset: offset};
        return getRequest(path, filters)
            .then((response) => {
                return resolve(response);
        })
        .then(null, (err) => reject(new Error(FETCH_ERR_MSG)));
    });
}
