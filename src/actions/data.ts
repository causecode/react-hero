import { fetchInstanceListFromApi } from '../api/auth/index';

import {SET_PAGE} from './actions';
import {IFilter} from '../components/PagedList/Filters/IFilters';
import {fetchInstanceDataFromApi} from '../api/auth/index';
import {BaseModel} from '../models/BaseModel';
import {FETCH_INSTANCE_DATA_START} from './instanceActions';
import {FETCH_INSTANCE_DATA_SUCCESS} from './instanceActions';
import {FETCH_INSTANCE_DATA_ERROR} from './instanceActions';

export const FETCH_INSTANCE_LIST_START = 'App/FETCH_INSTANCE_LIST_START';
export const FETCH_INSTANCE_LIST_SUCCESS = 'App/FETCH_INSTANCE_LIST_SUCCESS';
export const FETCH_INSTANCE_LIST_ERROR = 'App/FETCH_INSTANCE_LIST_ERROR';
export const DELETE_INSTANCE_LIST = 'App/DELETE_INSTANCE_LIST';
export const TOGGLE_FILTERS = 'TOGGLE_FILTERS';

export function fetchInstanceList(resource: string, offset: number) {
    return (dispatch) => {
        return dispatch({
            types: [
                FETCH_INSTANCE_LIST_START,
                FETCH_INSTANCE_LIST_SUCCESS,
                FETCH_INSTANCE_LIST_ERROR,
            ],
            payload: {
                promise: fetchInstanceListFromApi(resource, offset)
                    .then((response) => {
                        return response;
                    }),
            },
            resource: resource
        });
    };
};

export const setPage = (pageNumber: number) => {
    return {
        type: SET_PAGE,
        pageNumber: pageNumber
    };
};

export const toggleFilters = () => {
    return {
        type: TOGGLE_FILTERS
    };
};
