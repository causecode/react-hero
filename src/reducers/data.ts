import {
  FETCH_INSTANCE_LIST_START,
  FETCH_INSTANCE_LIST_SUCCESS,
  FETCH_INSTANCE_LIST_ERROR,
  DELETE_INSTANCE_LIST,
} from '../constants/index';

import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
    totalCount: 0,
    instanceList: [],
    properties: [],
    clazz: {},
    hasError: false,
    isLoading: false,
});


function dataReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {

    case FETCH_INSTANCE_LIST_START:
        return INITIAL_STATE;

    case FETCH_INSTANCE_LIST_SUCCESS:
        return state.merge(fromJS({
            totalCount: action.payload.totalCount,
            instanceList: action.payload.instanceList,
            properties: action.payload.properties,
            clazz: {},
            hasError: false,
            isLoading: false,
        }));

    case FETCH_INSTANCE_LIST_ERROR:
        return state.merge(fromJS({
            hasError: true,
            isLoading: false,
        }));

    case DELETE_INSTANCE_LIST:
        return state.merge(INITIAL_STATE);

    default:
        return state;
    }
}

export default dataReducer;