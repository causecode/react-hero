jest.unmock('../src/reducers/modelReducer');
import {modelReducer} from '../src/reducers/modelReducer';
jest.unmock('../src/actions/modelActions');
import {fromJS} from 'immutable';
import {
    FETCH_INSTANCE_DATA_START,
    FETCH_INSTANCE_DATA_FULFILLED,
    FETCH_INSTANCE_DATA_ERROR,
    SAVE_INSTANCE,
    DELETE_INSTANCE,
    UPDATE_INSTANCE,
    CREATE_INSTANCE,
    TOGGLE_FILTERS
} from '../src/constants';
import {BaseModel} from '../src/models/BaseModel';
import {resolver} from '../src/resolver';
import {ModelService} from '../src/utils/modelService';
import {MissingActionPayloadError} from '../src/errors/MissingActionPayloadError';
const initialState: Object = fromJS({});
const unroll: any = require<any>('unroll');
import {createStore} from 'redux';

unroll.use(it);

describe('test model reducer.', () => {
    let baseModelData: {name: string} = {name: 'testData'};
    let resourceString: string = 'test';
    let payloadString: string = 'testPayload';
    let testString: string = 'hello';
    let testKey: string = 'dummyKey';
    let testState: Object = fromJS({testState: testString});
    let error: Object = fromJS({'hasError': true, 'isLoading': false});

    let instance = new BaseModel(baseModelData);
    function getActionData(type: string, payloadData?: string, resource?: string, key?: string) {
        return {
            type,
            resource,
            key,
            payload: { testInstance: payloadData },
            instance
        };
    };
    const tempSuccess: {type: string, resource: string, payload: {testInstance: string}, instance: BaseModel} =
            getActionData(FETCH_INSTANCE_DATA_FULFILLED, payloadString, resourceString);

    const tempError: {type: string, resource: string, payload: {testInstance: string}, instance: BaseModel} =
            getActionData(FETCH_INSTANCE_DATA_ERROR, payloadString, resourceString);

    const tempCreate: {type: string, resource: string, payload: {testInstance: string}, instance: BaseModel} =
            getActionData(CREATE_INSTANCE, payloadString, resourceString, testKey);

    const store = createStore(modelReducer);

    it('should return the initial value when empty action is passed.', () => {
        expect(modelReducer(initialState, {})).toEqual(initialState);
    });

    it('should handle start case', () => {
        expect(modelReducer(initialState, getActionData(FETCH_INSTANCE_DATA_START))).toEqual(initialState);
    });

    unroll('should handle success case for #title.', (done, testArgs) => {
        expect(modelReducer(testArgs.state, tempSuccess).get(`${resourceString}Edit`)).toBeTruthy();
        done();
    }, [
        ['title', 'state'],
        ['test state', testState],
        ['initial state', initialState]
    ]);

    it('should handle success case for missing action payload.', () => {
        expect(() => modelReducer(initialState, {type: FETCH_INSTANCE_DATA_FULFILLED}))
                .toThrow(new MissingActionPayloadError());
    });

    unroll('should handle error case for #title', (done, testArgs) => {
        expect(modelReducer(testArgs.state, tempError).get(`${resourceString}Edit`)).toBeTruthy();
        expect(modelReducer(testArgs.state, tempError).get(`${resourceString}Edit`)).toEqual(error);
        done();
    }, [
        ['title', 'state'],
        ['test state', testState],
        ['initial state', initialState]
    ]);

    unroll('should #title correctly', (done, testArgs) => {
        let temp = modelReducer(initialState,
                    getActionData(testArgs.reducer, payloadString, resourceString, testKey));
        expect(temp.get(testKey)).toBeTruthy();
        expect(temp.get(testKey) instanceof BaseModel).toBeTruthy();
        done();
    }, [
        ['title', 'reducer'],
        ['save', SAVE_INSTANCE],
        ['update', UPDATE_INSTANCE]
    ]);

    it('should delete instance', () => {
        expect(modelReducer(initialState, getActionData(DELETE_INSTANCE, payloadString, resourceString, testKey)))
                .toEqual(initialState);
    });

    it('should create instance', () => {
        let temp = modelReducer(initialState, tempCreate);
        expect(temp.get(`${instance.resourceName}Create`)).toBeTruthy();
        expect(temp.get(`${instance.resourceName}Create`) instanceof BaseModel).toBeTruthy();
    });

    unroll('checks whether #title key is created in the store.', (done, testArgs) => {
        store.dispatch(testArgs.action);
        expect(store.getState().has(testArgs.page)).toBeTruthy();
        done();
    }, [
        ['title', 'action', 'page'],
        ['Create', tempCreate, `${instance.resourceName}Create`],
        ['Edit', tempSuccess, `${resourceString}Edit`]
    ]);

});
