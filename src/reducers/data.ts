import {
  FETCH_INSTANCE_LIST_START,
  FETCH_INSTANCE_LIST_SUCCESS,
  FETCH_INSTANCE_LIST_ERROR,
  DELETE_INSTANCE_LIST,
} from '../constants/index';

import {SET_PAGE} from '../actions/actions';
import { fromJS } from 'immutable';
import {TOGGLE_FILTERS} from '../actions/data';
import resolver from '../resolver';
import BaseModel from '../models/BaseModel';
import InstanceLoader from '../utils/instanceLoader';
import {ModelService} from '../utils/modelService';

const INITIAL_STATE = fromJS({
    totalCount: 0,
    instanceList: [],
    properties: [],
    clazz: {},
    hasError: false,
    isLoading: false,
    filtersOpen: false,
});

function dataReducer(state = INITIAL_STATE, action ) {
    let Model;
    let key: string;

    switch (action.type) {

        case FETCH_INSTANCE_LIST_START:
        return INITIAL_STATE;

        case FETCH_INSTANCE_LIST_SUCCESS:
            let resource = action.resource || '';
            Model = ModelService.getModel(resource);
            let instanceList;
            if (action.payload && action.payload.instanceList) {
                instanceList = action.payload.instanceList.map(instance => {
                    return InstanceLoader.instantiate<BaseModel>(Model, instance);
                });
            } else {
                throw new Error(`No Data in the Action Payload. Please make sure you are returning an instanceList from
                        the server.`);
            }
            return state.merge(fromJS({
                totalCount: action.payload.totalCount,
                instanceList: instanceList,
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

        case SET_PAGE:
            return state.update('activePage', (value) => value = action.pageNumber);

        case TOGGLE_FILTERS:
            return  state.update('filtersOpen', (value) => value = !value);

        default:
            return state;
        }
}

export default dataReducer;
