import {fromJS} from 'immutable';
import {BaseModel} from '../models/BaseModel';
import {ModelService} from '../utils/modelService';
import {
    FETCH_INSTANCE_LIST_START,
    FETCH_INSTANCE_LIST_FULFILLED,
    FETCH_INSTANCE_LIST_ERROR,
    TOGGLE_FILTERS,
    SET_PAGE,
    UNSET_RESOURCE_LIST,
    FETCH_INSTANCE_DATA_FULFILLED,
    FETCH_INSTANCE_DATA_START,
    FETCH_INSTANCE_DATA_ERROR,
    SAVE_INSTANCE,
    UPDATE_INSTANCE,
    DELETE_INSTANCE,
    CREATE_INSTANCE
} from '../constants';
import * as StoreService from '../utils/storeService';
import {MISSING_ACTION_PAYLOAD} from '../constants';

const INITIAL_STATE = fromJS({
    filtersOpen: false,
});

function dataReducer(state = INITIAL_STATE, action ) {
    let Model: typeof BaseModel;
    switch (action.type) {

        case FETCH_INSTANCE_DATA_START:
            return state;

        case FETCH_INSTANCE_DATA_FULFILLED:
            let instanceResource = action.resource || '';
            Model = ModelService.getModel(instanceResource);
            let instance = {};
            if (action.payload) {
                let payloadData = action.payload;
                for (let key in payloadData) {
                    if (payloadData.hasOwnProperty(key)) {
                        if (payloadData[key].constructor === Object) {
                            (<any>Object).assign(instance, payloadData[key]);
                        } else {
                            instance[key] = payloadData[key];
                        }
                    }
                }
            } else {
                throw new Error(MISSING_ACTION_PAYLOAD);
            }

            let modelInstance = new Model(instance);

            if (action.isEditPageInstance) {
                return state.set(`${instanceResource}Edit`, modelInstance);
            } else {
                return StoreService.setInstanceInList(state, instanceResource, modelInstance, true);
            }

        case FETCH_INSTANCE_DATA_ERROR:
            return state.set(`${action.resource}Edit`, fromJS({
                hasError: true,
                isLoading: false,
            }));

        case FETCH_INSTANCE_LIST_START:
            return state;

        case FETCH_INSTANCE_LIST_FULFILLED:
            let listResource = action.resource || '';
            Model = ModelService.getModel(listResource);
            let instanceList, totalCount: number, properties: string[];
            if (action.payload && action.payload.instanceList) {
                totalCount = action.payload.totalCount;
                properties = action.payload.properties;
                instanceList = action.payload.instanceList.map(instance => {
                    return new Model(instance);
                });
            } else {
                throw new Error(MISSING_ACTION_PAYLOAD);
            }
            let listProps = {};
            listProps = fromJS({
                totalCount: totalCount,
                instanceList: instanceList,
                properties: properties,
                hasError: false,
                isLoading: false,
            });
            return state.mergeIn([`${listResource}List`], listProps);

        case FETCH_INSTANCE_LIST_ERROR:
            return state.set(`${action.resource}List`, fromJS({
                hasError: true,
                isLoading: false,
            }));

        case 'SAVE_ALL_INSTANCES':
            let existingInstanceList = state.getIn([`${action.resource}List`, 'instanceList'], []);
            let incomingInstanceList = action.instanceList || [];
            return state.setIn(
                    [`${action.resource}List`, 'instanceList'],
                    existingInstanceList.concat(incomingInstanceList)
            );

        case SET_PAGE:
            return state.setIn([`${action.resource}List`, 'activePage'], action.pageNumber);

        case TOGGLE_FILTERS:
            return  state.update('filtersOpen', (value) => value = !value);

        case SAVE_INSTANCE:
            return StoreService.setAllInstances(state, action.resource, action.instance, true);

        case UPDATE_INSTANCE:
            return StoreService.setAllInstances(state, action.resource, action.instance);

        case DELETE_INSTANCE:
            return StoreService.deleteAllInstances(state, action.resource, action.instance);

        case CREATE_INSTANCE:
            return state.set(`${action.instance.resourceName}Create`, action.instance);

        case UNSET_RESOURCE_LIST: 
            return state.deleteIn([`${action.resource}List`, 'instanceList']);

        default:
            return state;
        }
}

export {dataReducer};
