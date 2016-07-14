import {IInstanceAction} from '../src/actions/instanceActions';
jest.unmock('../src/models/BaseModel');
import BaseModel from '../src/models/BaseModel';
import {IMockStore} from '../src/store/store';
const store: IMockStore = require<IMockStore>('../src/store/store').store as IMockStore;
import {saveInstance, updateInstance, deleteInstance} from '../src/actions/instanceActions';
import {SAVE_INSTANCE, DELETE_INSTANCE, UPDATE_INSTANCE} from '../src/actions/instanceActions';
import {HTTP} from '../src/api/server/index';
import {BASE_URL} from '../src/api/server/index';
import {InvalidInstanceDataError} from '../src/errors/InvalidInstanceDataError';


describe('Test Base Model', () => {
    let ModelInstance: BaseModel, instanceData, successCallback: jest.Mock<Function>,
            failureCallback: jest.Mock<Function>;

    beforeEach(() => {
        instanceData = {id: 1, author: 'abc'};
        ModelInstance = new BaseModel(instanceData);
        HTTP.postRequest = HTTP.getRequest = HTTP.putRequest = jest.fn((path: string, data: JSON) => {
            let promise: Promise = Promise.resolve({success: true});
            promise.then((response) => { return response; });
            return promise;
        });
        HTTP.deleteRequest = jest.fn((path: string) => {
            let promise: Promise = Promise.resolve({success: true});
            promise.then((response) => { return response; });
            return promise;
        });

        successCallback = jest.fn<Function>();
        failureCallback = jest.fn<Function>();

    });

    afterEach(() => {
        store.clearActions();
    });

    describe('Test $save method on the instance', () => {

        it('calls the $save method without any params', () => {
            ModelInstance.$save();

            expect(HTTP.postRequest).toBeCalledWith(`${ModelInstance.resourceName}/save`, ModelInstance.instanceData);

            let action: IInstanceAction = store.getActions()[0];
            expect(action.type).toEqual(SAVE_INSTANCE);
            expect(action.instance).toEqual(ModelInstance);
        });

        it('calls the $save method with flush', () => {
            ModelInstance.$save(true);

            expect(HTTP.postRequest).toBeCalledWith(`${ModelInstance.resourceName}/save`, ModelInstance.instanceData);

            let action: IInstanceAction = store.getActions()[0];
            expect(action.type).toEqual(SAVE_INSTANCE);
            expect(action.instance).toEqual(ModelInstance);
        });

        it('calls the $save method with flush false', () => {
            ModelInstance.$save(false);

            expect(HTTP.postRequest).not.toBeCalled();

            let action: IInstanceAction = store.getActions()[0];
            expect(action.type).toEqual(SAVE_INSTANCE);
            expect(action.instance).toEqual(ModelInstance);
        });

    });

    describe('Test $update method on the instance', () => {

        it('calls the $update method without any params', () => {
            ModelInstance.$update();

            expect(HTTP.putRequest).toBeCalledWith(`${ModelInstance.resourceName}/update`, ModelInstance.instanceData);

            let action: IInstanceAction = store.getActions()[0];
            expect(action.type).toEqual(UPDATE_INSTANCE);
            expect(action.instance).toEqual(ModelInstance);
        });

        it('calls the $update method with flush', () => {
            ModelInstance.$update(true);

            expect(HTTP.putRequest).toBeCalledWith(`${ModelInstance.resourceName}/update`, ModelInstance.instanceData);

            let action: IInstanceAction = store.getActions()[0];
            expect(action.type).toEqual(UPDATE_INSTANCE);
            expect(action.instance).toEqual(ModelInstance);
        });

        it('calls the $update method with flush false', () => {
            ModelInstance.$update(false);

            expect(HTTP.putRequest).not.toBeCalled();

            let action: IInstanceAction = store.getActions()[0];
            expect(action.type).toEqual(UPDATE_INSTANCE);
            expect(action.instance).toEqual(ModelInstance);
        });

    });

    describe('Test $delete method on the instance', () => {

        it('calls the $delete method without any params', () => {
            ModelInstance.$delete();

            expect(HTTP.deleteRequest)
                    .toBeCalledWith(`${ModelInstance.resourceName}/delete/${ModelInstance.instanceData.id}`);

            let action: IInstanceAction = store.getActions()[0];
            expect(action.type).toEqual(DELETE_INSTANCE);
            expect(action.instance).toEqual(ModelInstance);
        });

        it('calls the $delete method with flush', () => {
            ModelInstance.$delete(true);

            expect(HTTP.deleteRequest)
                    .toBeCalledWith(`${ModelInstance.resourceName}/delete/${ModelInstance.instanceData.id}`);

            let action: IInstanceAction = store.getActions()[0];
            expect(action.type).toEqual(DELETE_INSTANCE);
            expect(action.instance).toEqual(ModelInstance);
        });

        it('calls the $delete method with flush false', () => {
            ModelInstance.$delete(false);

            expect(HTTP.deleteRequest).not.toBeCalled();

            let action: IInstanceAction = store.getActions()[0];
            expect(action.type).toEqual(DELETE_INSTANCE);
            expect(action.instance).toEqual(ModelInstance);
        });

    });

});
