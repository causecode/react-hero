import { HTTP } from '../server/index';
import {store} from '../../store/store';
const objectAssign: any = require<any>('object-assign');
const getValues: (state: any) => any = require<{getValues: (state: any) => any}>('redux-form').getValues;

const FETCH_ERR_MSG = `Request couldn't be processed.`;

export function fetchInstanceListFromApi(path: string, offset: number): Promise<{}> {
    return new Promise((resolve, reject) => {
        let filterFormData = getValues(store.getState().form.dynamic);
        let filters = {offset: offset};
        objectAssign(filters, filterFormData);
        return HTTP.getRequest(path, filters)
            .then<void>((response) => {
                resolve(response);
            })
            .then<void>(null, (err) =>
                reject(new Error(FETCH_ERR_MSG))
            );
    });
}

export function fetchInstanceDataFromApi(path: string): Promise<{}> {
    return new Promise((resolve, reject) => {
        return HTTP.getRequest(path)
            .then((response) => {
                resolve(response);
            })
            .then(null, (err) =>
                reject(new Error(FETCH_ERR_MSG))
            );
    });

}
