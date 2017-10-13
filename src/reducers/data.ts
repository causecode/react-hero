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
} from '../constants';
import * as StoreService from '../utils/storeService';
import {MISSING_ACTION_PAYLOAD, CLEAR_INSTANCE_DATA_ERROR} from '../constants';
import {IFromJS} from '../interfaces';

const INITIAL_STATE = fromJS({
    filtersOpen: false,
});

function dataReducer(state = INITIAL_STATE, action ): IFromJS {
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
                        instance[key] = payloadData[key];

                    }
                }
            } else {
                throw new Error(MISSING_ACTION_PAYLOAD);
            }

            return StoreService.setInstanceInList(state, instanceResource, new Model(instance), true);

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
            let instanceListKey: string = Model[`instanceListKey`] || 'instanceList';
            let storeData: any = {};
            // Also save other values which are sent with instanceList
            if (action.payload) {
                let payloadData = action.payload;
                for (let payloadKey in payloadData) {
                    if (payloadData.hasOwnProperty(payloadKey)) {
                        if (payloadKey === instanceListKey) {
                            storeData.instanceList = payloadData[payloadKey].map((instanceKey): BaseModel => {
                                return new Model(instanceKey);
                            });
                        } else {
                            storeData[payloadKey] = payloadData[payloadKey];
                        }
                    }
                }
                storeData.hasError = false;
                storeData.isLoading = false;
            } else {
                throw new Error(MISSING_ACTION_PAYLOAD);
            }
            return state.mergeIn([`${listResource}List`], fromJS(storeData));

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
                    existingInstanceList.concat(incomingInstanceList),
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

        case UNSET_RESOURCE_LIST:
            return state.deleteIn([`${action.resource}List`, 'instanceList']);

        case CLEAR_INSTANCE_DATA_ERROR:
            return state.set(`${action.resource}Edit`, '');

        default:
            return state;
        }
}

export {dataReducer};
