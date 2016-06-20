import {
  FETCH_INSTANCE_LIST_START,
  FETCH_INSTANCE_LIST_SUCCESS,
  FETCH_INSTANCE_LIST_ERROR,
  DELETE_INSTANCE_LIST,
} from '../constants/index';

import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
    totalCount: 0,
    instanceList: [{author: 'initial author'}],
    properties: [],
    clazz: {},
    hasError: false,
    isLoading: false,
});


function dataReducer(state = INITIAL_STATE, action = { type: '', payload: null }) {
    switch (action.type) {

    case FETCH_INSTANCE_LIST_START:
        return state.merge(fromJS({
            totalCount: 0,
            instanceList: [{author: 'initial author'}],
            properties: [],
            clazz: {},
            hasError: false,
            isLoading: true,
        }));

    case FETCH_INSTANCE_LIST_SUCCESS:
        //return state.update('instanceList', (instanceList) => [{author: 'initial author'}]);
        return state.merge(fromJS({
            totalCount: action.payload.totalCount,
            //instanceList: action.payload.instanceList,
            //instanceList: [{author: 'final author', id: 'final id'}],
            instanceList: [{author: 'final author', id: 'final id'}, {author: 'second final author', id: 'secondfinal id'}],
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