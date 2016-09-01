import {IInstanceAction} from '../src/actions/modelActions';
jest.unmock('../src/models/BaseModel');
import {BaseModel} from '../src/models/BaseModel';
import {IMockStore} from '../src/store/store';
const store: IMockStore = require<IMockStore>('../src/store/store').store as IMockStore;
import {saveInstance, updateInstance, deleteInstance} from '../src/actions/modelActions';
import {SAVE_INSTANCE, DELETE_INSTANCE, UPDATE_INSTANCE} from '../src/actions/modelActions';
import {HTTP} from '../src/api/server/index';
import {BASE_URL} from '../src/api/server/index';
import {InvalidInstanceDataError} from '../src/errors/InvalidInstanceDataError';
import 'babel-polyfill';

describe('Test Base Model', () => {
    let successCallback: jest.Mock<Function>, failureCallback: jest.Mock<Function>;
    let successObject: {success: boolean} = {success: true};
    let failureObject: {success: boolean} = {success: false};
    let instanceData = {id: 1, author: 'abc'};
    let ModelInstance: BaseModel = new BaseModel(instanceData);
    let headers: {token: string} = {token: 'dummyToken'};

    async function verifyActions(type: string, instance: BaseModel): void {
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

        successCallback = jest.fn<Function>();
        failureCallback = jest.fn<Function>();

    });

    afterEach(() => {
        store.clearActions();
    });

    async function testWithoutParams(instance: BaseModel, functionName: string,
            HTTPMethod: Function, requestParams: Object): void {
        store.clearActions();
        await instance['$' + functionName]();

        expect(HTTPMethod).toBeCalledWith(...requestParams);

        verifyActions(`${functionName.toUpperCase()}_INSTANCE`, instance);
    }

    async function testWithFlush(instance: BaseModel, functionName: string,
            HTTPMethod: Function, requestParams: Object): void {
        store.clearActions();
        await instance[`$${functionName}`](true, successCallback, failureCallback, headers);

        expect(HTTPMethod).toBeCalledWith(...requestParams);
        expect(successCallback).toBeCalledWith(successObject);
        expect(failureCallback).not.toBeCalled();
        verifyActions(`${functionName.toUpperCase()}_INSTANCE`, instance);
    }

    async function testWithFlushFalse(instance: BaseModel, functionName: string,
            HTTPMethod: Function): void {
        store.clearActions();
        await instance[`$${functionName}`](false);

        expect(HTTPMethod).not.toBeCalled();
        verifyActions(`${functionName.toUpperCase()}_INSTANCE`, instance);
    }

    async function testWithFlushFalseAndCallbacks(instance: BaseModel, functionName: string,
            HTTPMethod: Function): void {
        store.clearActions();
        await instance[`$${functionName}`](false, successCallback, failureCallback, headers);

        expect(HTTPMethod).not.toBeCalled();
        expect(successCallback).not.toBeCalled();
        expect(failureCallback).not.toBeCalled();
        verifyActions(`${functionName.toUpperCase()}_INSTANCE`, instance);
    }

    async function testWithFlushAndPromiseFailure(instance: BaseModel, functionName: string,
            HTTPMethod: Function, requestParams: Object): void {
        store.clearActions();

        await instance[`$${functionName}`](true, successCallback, failureCallback, headers);
        expect(HTTPMethod).toBeCalledWith(...requestParams);
        expect(failureCallback).toBeCalledWith(failureObject);
        expect(successCallback).not.toBeCalled();
        expect(store.getActions().length).toBeFalsy();
    }

    describe('Test $save method on the instance', () => {

        it('calls the Model methods without any params',
                async () => {
            await testWithoutParams(ModelInstance, 'save', HTTP.postRequest,
                    [`${ModelInstance.resourceName}`, ModelInstance.properties, {}]);
            await testWithoutParams(ModelInstance, 'update', HTTP.putRequest,
                    [`${ModelInstance.resourceName}`, ModelInstance.properties, {}]);
            await testWithoutParams(ModelInstance, 'delete', HTTP.deleteRequest,
                    [`${ModelInstance.resourceName}/${ModelInstance.properties.id}`, {}]);
        });

        it('calls the methods with flush', async () => {
            await testWithFlush(ModelInstance, 'save', HTTP.postRequest,
                    [`${ModelInstance.resourceName}`, ModelInstance.properties, headers]);
            await testWithFlush(ModelInstance, 'update', HTTP.putRequest,
                    [`${ModelInstance.resourceName}`, ModelInstance.properties, headers]);
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
                    [`${ModelInstance.resourceName}`, ModelInstance.properties, headers]);
            await testWithFlushAndPromiseFailure(ModelInstance, 'update', HTTP.putRequest,
                    [`${ModelInstance.resourceName}`, ModelInstance.properties, headers]);
            await testWithFlushAndPromiseFailure(ModelInstance, 'delete', HTTP.deleteRequest,
                    [`${ModelInstance.resourceName}/${ModelInstance.properties.id}`, headers]);
        });

    });
});
