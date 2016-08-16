import {fromJS} from 'immutable';
import {resolver} from '../resolver';
import {BaseModel} from '../models/BaseModel';
import {ModelService} from '../utils/modelService';
import {
    FETCH_INSTANCE_LIST_START,
    FETCH_INSTANCE_LIST_SUCCESS,
    FETCH_INSTANCE_LIST_ERROR,
    TOGGLE_FILTERS,
    SET_PAGE
} from '../constants';

const INITIAL_STATE = fromJS({
    filtersOpen: false,
});

function dataReducer(state = INITIAL_STATE, action ) {
    let Model: typeof BaseModel;

    switch (action.type) {

        case FETCH_INSTANCE_LIST_START:
            return state;

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
            let listProps = {};
            listProps = fromJS({
                totalCount: totalCount,
                instanceList: instanceList,
                properties: properties,
                hasError: false,
                isLoading: false,
            });
            return state.mergeIn([`${resource}List`], listProps);

        case FETCH_INSTANCE_LIST_ERROR:
            return state.set(`${action.resource}List`, fromJS({
                hasError: true,
                isLoading: false,
            }));

        case SET_PAGE:
            return state.setIn([`${action.resource}List`, 'activePage'], action.pageNumber);

        case TOGGLE_FILTERS:
            return  state.update('filtersOpen', (value) => value = !value);

        default:
            return state;
        }
}

export {dataReducer};
