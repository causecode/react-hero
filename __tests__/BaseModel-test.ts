import {IInstanceAction} from '../src/actions/modelActions';
jest.unmock('../src/models/BaseModel');
import {DefaultModel, getData} from '../src/models/BaseModel';
import {HTTP} from '../src/api/server/index';
import 'babel-polyfill';
import * as axios from 'axios';
import {IMockStore} from '../src/store/index';
import {FETCH_INSTANCE_DATA} from '../src/constants';
const unroll: any = require<any>('unroll');
const store = require<any>('../src/store').store as IMockStore; 

unroll.use(it);

describe('Test Base Model', () => {
    let successCallback: Function, failureCallback: Function;
    let successObject: {success: boolean} = {success: true};
    let failureObject: {success: boolean} = {success: false};
    let instanceData: {id: number, author: string} = {id: 1, author: 'abc'};
    let ModelInstance: DefaultModel = new DefaultModel(instanceData);
    let headers: {token: string} = {token: 'dummyToken'};

    async function verifyActions(type: string, instance: DefaultModel) {
        let action: IInstanceAction = store.getActions()[0];
        expect(action.type).toEqual(type);
        expect(action.instance).toEqual(instance);
    }

    beforeEach(() => {

        function getNewHTTPMock() {
            return jest.fn((path: string, data?) => {
                return new Promise((resolve, reject): void => {
                    resolve(successObject);
                });
            });
        }

        HTTP.getRequest = getNewHTTPMock();
        HTTP.postRequest = getNewHTTPMock();
        HTTP.putRequest = getNewHTTPMock();
        HTTP.deleteRequest = getNewHTTPMock();

        successCallback = jest.fn<Function>() as Function;
        failureCallback = jest.fn<Function>() as Function;
    });

    afterEach(() => {
        store.clearActions();
    });

    async function testWithoutParams(instance: DefaultModel, functionName: string,
            HTTPMethod: Function, requestParams: (string | Object)[]) {
        store.clearActions();
        await instance['$' + functionName]();

        expect(HTTPMethod).toBeCalledWith(...requestParams);

        verifyActions(`${functionName.toUpperCase()}_INSTANCE`, instance);
    }

    async function testWithFlush(instance: DefaultModel, functionName: string,
            HTTPMethod: Function, requestParams: (string | Object)[]) {
        store.clearActions();
        await instance[`$${functionName}`](true, headers, successCallback, failureCallback);

        expect(HTTPMethod).toBeCalledWith(...requestParams);
        expect(successCallback).toBeCalledWith(successObject);
        expect(failureCallback).not.toBeCalled();
        verifyActions(`${functionName.toUpperCase()}_INSTANCE`, instance);
    }

    async function testWithFlushFalse(instance: DefaultModel, functionName: string,
            HTTPMethod: Function) {
        store.clearActions();
        await instance[`$${functionName}`](false);

        expect(HTTPMethod).not.toBeCalled();
        verifyActions(`${functionName.toUpperCase()}_INSTANCE`, instance);
    }

    async function testWithFlushFalseAndCallbacks(instance: DefaultModel, functionName: string,
            HTTPMethod: Function) {
        store.clearActions();
        await instance[`$${functionName}`](false, headers, successCallback, failureCallback);

        expect(HTTPMethod).not.toBeCalled();
        expect(successCallback).not.toBeCalled();
        expect(failureCallback).not.toBeCalled();
        verifyActions(`${functionName.toUpperCase()}_INSTANCE`, instance);
    }

    async function testWithFlushAndPromiseFailure(instance: DefaultModel, functionName: string,
            HTTPMethod: Function, requestParams: (string | Object)[]) {
        store.clearActions();
        await instance[`$${functionName}`](true, headers, successCallback, failureCallback);

        expect(HTTPMethod).toBeCalledWith(...requestParams);
        expect(failureCallback).toBeCalledWith(failureObject);
        expect(successCallback).not.toBeCalled();
        expect(store.getActions().length).toBeFalsy();
    }

    describe('Test $save, $update and $delete method on the instance', () => {

        it('calls the Model methods without any params',
                async () => {
            // Using a new instance here since on a save call the instance properties get updated.
            await testWithoutParams(new DefaultModel(instanceData), 'save', HTTP.postRequest,
                    [`${ModelInstance.resourceName}`, {}, instanceData]);
            await testWithoutParams(ModelInstance, 'update', HTTP.putRequest,
                    [`${ModelInstance.resourceName}`, {}, ModelInstance.properties]);
            await testWithoutParams(ModelInstance, 'delete', HTTP.deleteRequest,
                    [`${ModelInstance.resourceName}/${ModelInstance.properties.id}`, {}]);
        });

        it('calls the methods with flush', async () => {
            await testWithFlush(new DefaultModel(instanceData), 'save', HTTP.postRequest,
                    [`${ModelInstance.resourceName}`, headers, instanceData]);
            await testWithFlush(ModelInstance, 'update', HTTP.putRequest,
                    [`${ModelInstance.resourceName}`, headers, ModelInstance.properties]);
            await testWithFlush(ModelInstance, 'delete', HTTP.deleteRequest,
                    [`${ModelInstance.resourceName}/${ModelInstance.properties.id}`, headers]);
        });

        it('calls the methods with flush false', async() => {
            await testWithFlushFalse(ModelInstance, 'save', HTTP.postRequest);
            await testWithFlushFalse(ModelInstance, 'update', HTTP.putRequest);
            await testWithFlushFalse(ModelInstance, 'delete', HTTP.deleteRequest);
        });

        it('calls the methods with flush false and callbacks', async () => {
            await testWithFlushFalseAndCallbacks(ModelInstance, 'save', HTTP.postRequest);
            await testWithFlushFalseAndCallbacks(ModelInstance, 'update', HTTP.putRequest);
            await testWithFlushFalseAndCallbacks(ModelInstance, 'delete', HTTP.deleteRequest);
        });

        
        it('calls the methods with flush true and promise failure condition', async () => {
            HTTP.deleteRequest = HTTP.putRequest = HTTP.postRequest = jest.fn((path: string, data) => {
                return new Promise((resolve, reject): void => {
                    reject(failureObject);
                });
            });
            await testWithFlushAndPromiseFailure(ModelInstance, 'save', HTTP.postRequest,
                    [`${ModelInstance.resourceName}`, headers, ModelInstance.properties]);
            await testWithFlushAndPromiseFailure(ModelInstance, 'update', HTTP.putRequest,
                    [`${ModelInstance.resourceName}`, headers, ModelInstance.properties]);
            await testWithFlushAndPromiseFailure(ModelInstance, 'delete', HTTP.deleteRequest,
                    [`${ModelInstance.resourceName}/${ModelInstance.properties.id}`, headers]);
        });

    });

    describe('Tests get method.', () => {

        let id: number = 10;
        let innerDispatch: jest.Mock<typeof store.dispatch>;
        beforeEach(() => {
            innerDispatch = jest.fn<typeof store.dispatch>();
            store.dispatch = jest.fn<Function>((fn) => fn(innerDispatch));
            store.getState = jest.fn<Function>(() => {
                return {instances: {}};
            });
        });

        it('calls the get method without valueStore. ', async () => {
            let successData: {success: boolean} = {success: true};
            await DefaultModel.get(id.toString(), false, headers, successCallback, failureCallback, store.getState());

            let innerDispatchCall = innerDispatch.mock.calls[0][0];
            expect(innerDispatchCall.type).toEqual(FETCH_INSTANCE_DATA);
            innerDispatchCall.payload.promise.then((response) => {
                expect(response).toEqual(successData);
            });
            expect(innerDispatchCall.resource).toEqual(DefaultModel.resourceName);
            expect(innerDispatchCall.successCallBack).toEqual(successCallback);
            expect(innerDispatchCall.failureCallBack).toEqual(failureCallback);
        });

        it('calls the get method with valueStore. ', () => {
            DefaultModel.get(id.toString(), true, successCallback, failureCallback);
            expect(store.getState).toBeCalled();
            expect(store.dispatch).not.toBeCalled();
        });
    });

    describe('Tests list method.', () => {

        let filters: {} = {};
        beforeEach(() => {
            store.dispatch = jest.fn<Function>();
            store.getState = jest.fn<Function>(() => {
                    return {
                                data: {},
                                form: {dynamic: {}}
                            };
                    });
        });

        it('calls the list method with valueStore. ', () => {
            DefaultModel.list(filters, true, successCallback, failureCallback);
            expect(store.getState).toBeCalled();
            expect(store.dispatch).not.toBeCalled();
        });

        it('calls the list method without valueStore. ', () => {
            DefaultModel.list(filters, false, successCallback, failureCallback);
            expect(store.getState).toBeCalled();
            expect(store.dispatch).toBeCalled();
        });
    });

    describe('Tests getData function ', () => {
        let incorrectPath: string = 'test/123';
        beforeEach(() => {
            HTTP.getRequest = jest.fn<Function>((path) => {
                let promise: Promise<{}> = Promise.resolve({});
                return promise;
            });
        });
        unroll('successfully calls to: #path', (done, testArgs) => {
            getData(testArgs.path, {});
            expect(HTTP.getRequest).toBeCalledWith(testArgs.path, {}, {});
            expect(HTTP.getRequest).not.toBeCalledWith(incorrectPath);
            done();
        }, [
            ['path'],
            ['test'],
            ['demo/show/123']
        ]);

    });
});
