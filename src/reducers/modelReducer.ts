import {
    FETCH_INSTANCE_DATA_START,
    FETCH_INSTANCE_DATA_SUCCESS,
    FETCH_INSTANCE_DATA_ERROR,
    SAVE_INSTANCE,
    DELETE_INSTANCE,
    UPDATE_INSTANCE,
    CREATE_INSTANCE,
    TOGGLE_FILTERS
} from '../constants';
import {fromJS} from 'immutable';
import {BaseModel} from '../models/BaseModel';
import {resolver} from '../resolver';
import {ModelService} from '../utils/modelService';
import {MissingActionPayloadError} from '../errors/MissingActionPayloadError';
const INITIAL_STATE = fromJS({});

export function modelReducer(state = INITIAL_STATE, action) {
    let Model: typeof BaseModel;
    let modelInstanceKey = action.instance ? `${action.instance.resourceName}Model` : '';
    switch (action.type) {
        case FETCH_INSTANCE_DATA_START:
            return state;

        case FETCH_INSTANCE_DATA_SUCCESS:
            let resource = action.resource || '';
            Model = ModelService.getModel(resource);
            let instance;
            if (action.payload) {
                instance = action.payload[`${action.resource}Instance`];
            } else {
                throw new MissingActionPayloadError();
            }
            return state.set(`${action.resource}Edit`, new Model(instance));

        case FETCH_INSTANCE_DATA_ERROR:
            return state.set(`${action.resource}Edit`, fromJS({
                hasError: true,
                isLoading: false,
            }));

        case SAVE_INSTANCE:
            return state.set(action.key, action.instance);

        case UPDATE_INSTANCE:
            let instanceKey = action.key || modelInstanceKey;
            let news = state.set(instanceKey, action.instance);
            return news;

        case DELETE_INSTANCE:
            return state.delete(action.key);

        case CREATE_INSTANCE:
            return state.set(`${action.instance.resourceName}Create`, action.instance);

        default:
            return state;
    }
}
