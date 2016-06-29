import {SAVE_INSTANCE} from "../actions/instanceActions";
import {UPDATE_INSTANCE} from "../actions/instanceActions";
import {fromJS} from 'immutable';
import {DELETE_INSTANCE} from "../actions/instanceActions";
const INITIAL_STATE = fromJS({});

export default function crudReducer(state = INITIAL_STATE, action) {
    let newState;
    let instanceKey = action.instance ? `${action.instance.resourceName}Model` : '';
    switch(action.type) {
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
