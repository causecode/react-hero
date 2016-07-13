import {SAVE_INSTANCE} from '../actions/instanceActions';
import {UPDATE_INSTANCE} from '../actions/instanceActions';
import {fromJS} from 'immutable';
import {DELETE_INSTANCE} from '../actions/instanceActions';
import {
    FETCH_INSTANCE_DATA_START,
    FETCH_INSTANCE_DATA_SUCCESS,
    FETCH_INSTANCE_DATA_ERROR} from '../actions/instanceActions';
import InstanceLoader from '../utils/instanceLoader';
import BaseModel from '../models/BaseModel';
import {resolver} from '../resolver';
import {ModelService} from '../utils/modelService';
const INITIAL_STATE = fromJS({});

export default function instanceReducer(state = INITIAL_STATE, action) {
    let Model;
    let instanceKey = action.instance ? `${action.instance.resourceName}Model` : '';
    switch (action.type) {
        case FETCH_INSTANCE_DATA_START:
            return INITIAL_STATE;

        case FETCH_INSTANCE_DATA_SUCCESS:
            let key;
            key = action.resource;
            Model = ModelService.getModel(key);
            let instance = action.payload[`${action.resource}Instance`];
            return state.set(action.resource, InstanceLoader.instantiate<BaseModel>(Model, instance));

        case FETCH_INSTANCE_DATA_ERROR:
            return state.merge(fromJS({
                hasError: true,
                isLoading: false,
            }));

        case SAVE_INSTANCE:
            return state.set(instanceKey, action.instance);

        case UPDATE_INSTANCE:
            return state.set(instanceKey, action.instance);

        case DELETE_INSTANCE:
            return state.delete(instanceKey);

        default:
            return state;
    }
}
