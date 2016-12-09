jest.unmock('../src/reducers/data');
jest.mock('../src/utils/storeService');
import * as StoreService from '../src/utils/storeService';
import {MissingActionPayloadError} from '../src/errors/MissingActionPayloadError';
import {initializeTestCase} from './../src/utils/initializeTestCase';
import {IInitializerData} from './../src/utils/initializeTestCase';
import {dataReducer} from '../src/reducers/data';
import {BaseModel} from '../src/models/BaseModel';
import {fromJS} from 'immutable';
import {IFromJS} from '../src/interfaces';
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
    SAVE_ALL_INSTANCES
} from '../src/constants';
const unroll: any = require<any>('unroll');

unroll.use(it);
export interface IActionData {
    type: string;
    resource: string;
    payload: {
        instanceList: {data: string}[]
    };
    pageNumber: number;
    instance: BaseModel;
}

describe('Data-dataReducer', () => {

    const INITIAL_STATE: IFromJS = fromJS({
        totalCount: 0,
        instanceList: [],
        properties: [],
        hasError: false,
        isLoading: false,
        filtersOpen: false,
    });
    let error: IFromJS = fromJS({'hasError': true, 'isLoading': false});
    let {resource, instances}: IInitializerData = initializeTestCase();

    function actionData(type: string, payloadData?: string, page?: number, resource?: string): IActionData {
        return {
            type,
            resource,
            payload: { instanceList:
                [{data : payloadData}]
            },
            pageNumber: page,
            instance: instances[resource]
        };
    }

    let payloadString: string = 'test';
    let pageNo: number = 12;
    let resourceString: string = 'test';
    const successListAction: IFromJS = dataReducer(
            INITIAL_STATE,
            actionData(FETCH_INSTANCE_LIST_FULFILLED, payloadString, pageNo, resourceString)
    );

    const saveAllInstancesAction: IFromJS = dataReducer(
            INITIAL_STATE, 
            actionData(SAVE_ALL_INSTANCES, payloadString, pageNo, resourceString)
    );

    const successDataAction:IActionData =
            actionData(FETCH_INSTANCE_DATA_FULFILLED, payloadString, pageNo, resourceString);

    const errorDataAction: IActionData =
            actionData(FETCH_INSTANCE_DATA_ERROR, payloadString, pageNo, resourceString);

    it('should return the initial value.', () => {
        expect(dataReducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });

    it('should handle start case.', () => {
        expect(dataReducer(INITIAL_STATE, actionData(FETCH_INSTANCE_LIST_START))).toEqual(INITIAL_STATE);
        expect(dataReducer(INITIAL_STATE, actionData(FETCH_INSTANCE_DATA_START))).toEqual(INITIAL_STATE);
    });

    it('should handle error case for LIST', () => {
        let result: {type: string, resource: string, payload: {instanceList: {data: string}[]}, pageNumber: number} =
                actionData(FETCH_INSTANCE_LIST_ERROR, payloadString, pageNo, resourceString);
        expect(dataReducer(INITIAL_STATE, result).get(`${resourceString}List`)).toBeTruthy();
        expect(dataReducer(INITIAL_STATE, result).get(`${resourceString}List`)).toEqual(error);
    });

    it('should handle set page.', () => {
        let result: IFromJS = dataReducer(INITIAL_STATE, actionData(SET_PAGE, payloadString, pageNo, resourceString));
        expect(result.get(`${resourceString}List`)).toBeTruthy();
        expect(result.get(`${resourceString}List`).get('activePage')).toEqual(pageNo);
    });

    it('should handle toggle case', () => {
        let result: IFromJS = 
                dataReducer(INITIAL_STATE, actionData(TOGGLE_FILTERS, payloadString, pageNo, resourceString));
        expect(result.get(`filtersOpen`)).toBeTruthy();
        expect(result.get(`filtersOpen`)).toEqual(true);
    });

    it('should handle success case for LIST', () => {
        expect(successListAction.get(`${resourceString}List`)).toBeTruthy();
    });

    unroll('checks if the LIST success object contains #name', (done, testArgs) => {
        expect(successListAction.get(`${resourceString}List`).has(testArgs.name)).toBeTruthy();
        done();
    }, [
        ['name'],
        ['hasError'],
        ['instanceList'],
        ['isLoading'],
        ['properties'],
        ['totalCount']
    ]);

    it('should throw error when Payload is not provided.', () => {
        expect(() => dataReducer(INITIAL_STATE, {type: FETCH_INSTANCE_LIST_FULFILLED}))
                .toThrow(new MissingActionPayloadError());
    });

    it('should delete instance', () => {
        dataReducer(INITIAL_STATE, actionData(DELETE_INSTANCE, payloadString, pageNo, resourceString))
        expect(StoreService.deleteAllInstances).toBeCalled();
    });

    it('should save instance', () => {
        dataReducer(INITIAL_STATE, actionData(SAVE_INSTANCE, payloadString, pageNo, resourceString))
        expect(StoreService.setAllInstances).toBeCalled();
    });

    it('should update instance', () => {
        dataReducer(INITIAL_STATE, actionData(UPDATE_INSTANCE, payloadString, pageNo, resourceString))
        expect(StoreService.setAllInstances).toBeCalled();
    });

    it('should handle success case for DATA.', () => {
        dataReducer(INITIAL_STATE, successDataAction);
        expect(StoreService.setInstanceInList).toBeCalled();
    });

    it('should handle success case for missing action payload while fetching DATA.', () => {
        expect(() => dataReducer(INITIAL_STATE, {type: FETCH_INSTANCE_DATA_FULFILLED}))
                .toThrow(new MissingActionPayloadError());
    });

    it('should handle error case for #title', () => {
        expect(dataReducer(INITIAL_STATE, errorDataAction).get(`${resourceString}Edit`)).toBeTruthy();
        expect(dataReducer(INITIAL_STATE, errorDataAction).get(`${resourceString}Edit`)).toEqual(error);
    });

    it('should save all the instances', () => {
        let instancesList = saveAllInstancesAction.get(`${resourceString}List`);
        expect(instancesList.has('instanceList')).toBeTruthy();
        expect(instancesList.has('hasError')).toBeFalsy();
        expect(instancesList.has('isLoading')).toBeFalsy();
    });

    it('should unset resource list.', () => {
        let instanceAfterUnset: IFromJS = dataReducer(
                INITIAL_STATE, 
                actionData(UNSET_RESOURCE_LIST, payloadString, pageNo, resourceString)
        ); 
        expect(instanceAfterUnset.get(`${resourceString}List`)).toBeFalsy();
    });
});
