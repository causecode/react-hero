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
import {createStore, Store} from 'redux';
import {IFromJS} from '../src/interfaces/interfaces';

unroll.use(it);

describe('test model reducer.', () => {
    let baseModelData: {name: string} = {name: 'testData'};
    let resourceString: string = 'test';
    let payloadString: string = 'testPayload';
    let testString: string = 'hello';
    let testKey: string = 'dummyKey';
    let testState: IFromJS = fromJS({testState: testString});
    let error: IFromJS = fromJS({'hasError': true, 'isLoading': false});

    let instance: BaseModel = new BaseModel(baseModelData);
    function getActionData(type: string, payloadData?: string, resource?: string, key?: string) {
        return {
            type,
            resource,
            key,
            payload: { testInstance: payloadData },
            instance
        };
    };
    const successAction: {type: string, resource: string, payload: {testInstance: string}, instance: BaseModel} =
            getActionData(FETCH_INSTANCE_DATA_FULFILLED, payloadString, resourceString);

    const errorAction: {type: string, resource: string, payload: {testInstance: string}, instance: BaseModel} =
            getActionData(FETCH_INSTANCE_DATA_ERROR, payloadString, resourceString);

    const createAction: {type: string, resource: string, payload: {testInstance: string}, instance: BaseModel} =
            getActionData(CREATE_INSTANCE, payloadString, resourceString, testKey);

    const store: Store = createStore(modelReducer);

    it('should return the initial value when empty action is passed.', () => {
        expect(modelReducer(initialState, {})).toEqual(initialState);
    });

    it('should handle start case', () => {
        expect(modelReducer(initialState, getActionData(FETCH_INSTANCE_DATA_START))).toEqual(initialState);
    });

    unroll('should handle success case for #title.', (done, testArgs) => {
        expect(modelReducer(testArgs.state, successAction).get(`${resourceString}Edit`)).toBeTruthy();
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
        expect(modelReducer(testArgs.state, errorAction).get(`${resourceString}Edit`)).toBeTruthy();
        expect(modelReducer(testArgs.state, errorAction).get(`${resourceString}Edit`)).toEqual(error);
        done();
    }, [
        ['title', 'state'],
        ['test state', testState],
        ['initial state', initialState]
    ]);

    unroll('should #title correctly', (done, testArgs) => {
        let result: IFromJS = modelReducer(initialState,
                    getActionData(testArgs.reducer, payloadString, resourceString, testKey));
        expect(result.get(testKey)).toBeTruthy();
        expect(result.get(testKey) instanceof BaseModel).toBeTruthy();
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
        let result: IFromJS = modelReducer(initialState, createAction);
        expect(result.get(`${instance.resourceName}Create`)).toBeTruthy();
        expect(result.get(`${instance.resourceName}Create`) instanceof BaseModel).toBeTruthy();
    });

    unroll('checks whether #title key is created in the store.', (done, testArgs) => {
        store.dispatch(testArgs.action);
        expect(store.getState().has(testArgs.page)).toBeTruthy();
        done();
    }, [
        ['title', 'action', 'page'],
        ['Create', createAction, `${instance.resourceName}Create`],
        ['Edit', successAction, `${resourceString}Edit`]
    ]);

});
