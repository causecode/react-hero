import { getRequest, post } from '../server/index';
import {IFilter} from "../../components/PagedList/Filters/IFilters";
import {store} from "../../store/store";
const objectAssign = require<any>('object-assign');
const getValues = require<any>('redux-form').getValues;

const FETCH_ERR_MSG = `Request couldn't be processed.`;

export function fetchInstanceListFromApi(path: string, offset: number) {
    return new Promise((resolve, reject) => {
        let filterFormData = getValues(store.getState().form.dynamic);
        let filters = {offset: offset};
        objectAssign(filters, filterFormData);
        return getRequest(path, filters)
            .then((response) => {
                return resolve(response);
        })
        .then(null, (err) => reject(new Error(FETCH_ERR_MSG)));
    });
}
