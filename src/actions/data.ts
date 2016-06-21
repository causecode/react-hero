import { fetchInstanceListFromApi } from '../api/auth/index';
import {
  FETCH_INSTANCE_LIST_START,
  FETCH_INSTANCE_LIST_SUCCESS,
  FETCH_INSTANCE_LIST_ERROR
} from '../constants/index';
import {IFilter} from "../containers/list-page";

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
}