import {fromJS} from 'immutable';
const INITIAL_STATE = fromJS({});

export function modelReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        /*case SAVE_INSTANCE:
            return state.set(action.key, action.instance);

        case UPDATE_INSTANCE:
            let instanceKey = action.key || modelInstanceKey;
            return state.set(instanceKey, action.instance);

        case DELETE_INSTANCE:
            return state.delete(action.key);

        case CREATE_INSTANCE:
            return state.set(`${action.instance.resourceName}Create`, action.instance);*/

        default:
            return state;
    }
}
