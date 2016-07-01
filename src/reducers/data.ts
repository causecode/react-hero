import {
  FETCH_INSTANCE_LIST_START,
  FETCH_INSTANCE_LIST_SUCCESS,
  FETCH_INSTANCE_LIST_ERROR,
  DELETE_INSTANCE_LIST,
} from '../constants/index';

import {SET_PAGE} from '../actions/actions';
import { fromJS } from 'immutable';
import {TOGGLE_FILTERS} from "../actions/data";
import resolver from '../resolver';
import BaseModel from "../models/BaseModel";
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
            if (action.resource) {
                key = action.resource.toLowerCase();
                if (ModelService.hasModel(key)) {
                    Model = ModelService.getModel(key);
                } else {
                    console.error(`Unable to find ${key}Model using BaseModel instead.`);
                    Model = BaseModel;
                }
            }
        let instanceList = action.payload.instanceList.map(instance => {
            let ModelInst : IBaseModel = InstanceLoader.instantiate<BaseModel>(Model, instance);
            return ModelInst;
        });
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
        return  state.update('filtersOpen', (value) => value = !value)

    default:
        return state;
    }
}

export default dataReducer;
