import { fetchInstanceListFromApi } from '../api/auth/index';
import {
    FETCH_INSTANCE_LIST_START,
    FETCH_INSTANCE_LIST_SUCCESS,
    FETCH_INSTANCE_LIST_ERROR,
    FETCH_INSTANCE_DATA_START,
    FETCH_INSTANCE_DATA_SUCCESS,
    FETCH_INSTANCE_DATA_ERROR
} from '../constants/index';
import {SET_PAGE} from "./actions";
import {IFilter} from "../components/PagedList/Filters/IFilters";
import {fetchInstanceDataFromApi} from "../api/auth/index";
import BaseModel from '../models/BaseModel';

export const TOGGLE_FILTERS = 'TOGGLE_FILTERS';

export function fetchInstanceList(resource:string, offset:number) {
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

export function fetchInstanceData(resource:string, resourceID:string) {
    let path:string = `${resource}/show/${resourceID}`;
    return (dispatch) => {
        return dispatch({
            types: [
                FETCH_INSTANCE_DATA_START,
                FETCH_INSTANCE_DATA_SUCCESS,
                FETCH_INSTANCE_DATA_ERROR,
            ],
            payload: {
                promise: fetchInstanceDataFromApi(path)
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
    }
}

export const toggleFilters = () => {
    return {
        type: TOGGLE_FILTERS
    }
}