import {SET_PAGE} from '../actions/actions';
import {fromJS} from 'immutable';
import {TOGGLE_FILTERS} from '../actions/data';
import {resolver} from '../resolver';
import {BaseModel} from '../models/BaseModel';
import {ModelService} from '../utils/modelService';
import {
    FETCH_INSTANCE_LIST_START,
    FETCH_INSTANCE_LIST_SUCCESS,
    FETCH_INSTANCE_LIST_ERROR,
    DELETE_INSTANCE_LIST
} from '../actions/data';

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
    let Model: typeof BaseModel;

    switch (action.type) {

        case FETCH_INSTANCE_LIST_START:
        return INITIAL_STATE;

        case FETCH_INSTANCE_LIST_SUCCESS:
            let resource = action.resource || '';
            Model = ModelService.getModel(resource);
            let instanceList, totalCount: number, properties: string[];
            if (action.payload && action.payload.instanceList) {
                totalCount = action.payload.totalCount;
                properties = action.payload.properties;
                instanceList = action.payload.instanceList.map(instance => {
                    return new Model(instance);
                });
            } else {
                throw new Error('No Data in the Action Payload. Please make sure you are returning an instanceList' +
                    ' from the server.');
            }
            return state.merge(fromJS({
                totalCount: totalCount,
                instanceList: instanceList,
                properties: properties,
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

export {dataReducer};
