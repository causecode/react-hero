import {SET_PAGE} from './actions';
import {BaseModel} from '../models/BaseModel';
import {FETCH_INSTANCE_DATA_START} from './modelActions';
import {FETCH_INSTANCE_DATA_SUCCESS} from './modelActions';
import {FETCH_INSTANCE_DATA_ERROR} from './modelActions';
import {ModelService} from '../utils/modelService';
import {store} from '../store/store';
const objectAssign: any = require<any>('object-assign');
const getValues: (state: any) => any = require<{getValues: (state: any) => any}>('redux-form').getValues;

export const FETCH_INSTANCE_LIST_START = 'App/FETCH_INSTANCE_LIST_START';
export const FETCH_INSTANCE_LIST_SUCCESS = 'App/FETCH_INSTANCE_LIST_SUCCESS';
export const FETCH_INSTANCE_LIST_ERROR = 'App/FETCH_INSTANCE_LIST_ERROR';
export const DELETE_INSTANCE_LIST = 'App/DELETE_INSTANCE_LIST';
export const TOGGLE_FILTERS = 'TOGGLE_FILTERS';

export function fetchInstanceList(resource: string, offset: number) {
    let filterFormData = getValues(store.getState().form.dynamic);
    let filters = {offset: offset};
    objectAssign(filters, filterFormData);
    return (dispatch) => {
        return dispatch({
            types: [
                FETCH_INSTANCE_LIST_START,
                FETCH_INSTANCE_LIST_SUCCESS,
                FETCH_INSTANCE_LIST_ERROR,
            ],
            payload: {
                promise: ModelService.getModel(resource).list(filters),
            },
            resource: resource
        });
    };
}

export const setPage = (pageNumber: number): {type: string, pageNumber: number} => {
    return {
        type: SET_PAGE,
        pageNumber: pageNumber
    };
};

export const toggleFilters = (): {type: string} => {
    return {
        type: TOGGLE_FILTERS
    };
};
