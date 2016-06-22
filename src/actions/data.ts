import { fetchInstanceListFromApi } from '../api/auth/index';
import {
  FETCH_INSTANCE_LIST_START,
  FETCH_INSTANCE_LIST_SUCCESS,
  FETCH_INSTANCE_LIST_ERROR
} from '../constants/index';
import {SET_PAGE} from "./actions";
import {IFilter} from "../components/PagedList/Filters/IFilters";

export function fetchInstanceList(resource: string, filters: IFilter) {
    return (dispatch) => {
        return dispatch({
          types: [
              FETCH_INSTANCE_LIST_START,
              FETCH_INSTANCE_LIST_SUCCESS,
              FETCH_INSTANCE_LIST_ERROR,
          ],
          payload: {
              promise: fetchInstanceListFromApi(resource, filters)
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