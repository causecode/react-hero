import {
  FETCH_INSTANCE_LIST_START,
  FETCH_INSTANCE_LIST_SUCCESS,
  FETCH_INSTANCE_LIST_ERROR,
  DELETE_INSTANCE_LIST,
} from '../constants/index';

import {SET_PAGE} from '../actions/actions';
import { fromJS } from 'immutable';
import {TOGGLE_FILTERS} from "../actions/data";
import {
    FETCH_INSTANCE_DATA_START,
    FETCH_INSTANCE_DATA_SUCCESS,
    FETCH_INSTANCE_DATA_ERROR
} from "../constants/index";
import BlogModel from '../Demo/TestModel';
import {ModuleFactory} from "../Demo/TestImplementations";

const INITIAL_STATE = fromJS({
    totalCount: 0,
    instanceList: [],
    properties: [],
    clazz: {},
    hasError: false,
    isLoading: false,
    filtersOpen: false,
    blogInstance: {}
});

function instantiate<T>(ctor: { new(...args: any[]): T }, args): T {
    return new ctor(...args);
}

function dataReducer(state = INITIAL_STATE, action ) {
    let Model;
    switch (action.type) {

    case FETCH_INSTANCE_LIST_START:
        return INITIAL_STATE;

    case FETCH_INSTANCE_LIST_SUCCESS:
        Model = new ModuleFactory().getClass('blog');
        let instanceList = action.payload.instanceList.map(instance => {
            return instantiate(Model, [instance]);
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

    case FETCH_INSTANCE_DATA_START:
        return INITIAL_STATE;

    case FETCH_INSTANCE_DATA_SUCCESS:
        Model = new ModuleFactory().getClass('blog');
        return state.merge(fromJS({
            blogInstance: instantiate(Model, [action.payload.blogInstance])
        }));

    case FETCH_INSTANCE_DATA_ERROR:
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
