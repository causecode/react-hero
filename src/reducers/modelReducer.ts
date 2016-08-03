import {SAVE_INSTANCE} from '../actions/modelActions';
import {UPDATE_INSTANCE} from '../actions/modelActions';
import {fromJS} from 'immutable';
import {DELETE_INSTANCE} from '../actions/modelActions';
import {
    FETCH_INSTANCE_DATA_START,
    FETCH_INSTANCE_DATA_SUCCESS,
    FETCH_INSTANCE_DATA_ERROR} from '../actions/modelActions';
import {BaseModel} from '../models/BaseModel';
import {resolver} from '../resolver';
import {ModelService} from '../utils/modelService';
const INITIAL_STATE = fromJS({});

export function modelReducer(state = INITIAL_STATE, action) {
    let Model: typeof BaseModel;
    let instanceKey = action.instance ? `${action.instance.resourceName}Model` : '';
    switch (action.type) {
        case FETCH_INSTANCE_DATA_START:
            return INITIAL_STATE;

        case FETCH_INSTANCE_DATA_SUCCESS:
            let resource = action.resource || '';
            Model = ModelService.getModel(resource);
            let instance;
            if (action.payload) {
                instance = action.payload[`${action.resource}Instance`];
            } else {
                throw new Error('No Data in the Action Payload. Please make sure you are returning an instanceList' +
                    ' from the server.');
            }
            return state.set(action.resource, new Model(instance));

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
