import { fetchInstanceListFromApi } from '../api/auth/index';
import {
  FETCH_INSTANCE_LIST_START,
  FETCH_INSTANCE_LIST_SUCCESS,
  FETCH_INSTANCE_LIST_ERROR
} from '../constants';

export function fetchInstanceList() {
    return (dispatch) => {
        return dispatch({
          types: [
              FETCH_INSTANCE_LIST_START,
              FETCH_INSTANCE_LIST_SUCCESS,
              FETCH_INSTANCE_LIST_ERROR,
          ],
          payload: {
              promise: fetchInstanceListFromApi()
              .then((res) => {
                  return res;
              }),
          },
        });
    };
}