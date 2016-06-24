import { fetchInstanceListFromApi } from '../api/auth/index';
import {
  FETCH_INSTANCE_LIST_START,
  FETCH_INSTANCE_LIST_SUCCESS,
  FETCH_INSTANCE_LIST_ERROR
} from '../constants/index';
import {SET_PAGE} from "./actions";
import {IFilter} from "../components/PagedList/Filters/IFilters";

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
              .then((res) => {
                  return res;
              }),
          },
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