jest.unmock('../src/utils/appService.tsx');
jest.unmock('immutable');

import {BaseModel} from '../src/models/BaseModel';
import {store, IMockStore} from '../src/store';
import {fromJS} from 'immutable';
import {ModelPropTypes} from '../src/models/ModelPropTypes';
import {
    getIn, 
    getModelString, 
    getEnvironment, 
    isEmpty, 
    objectEquals, 
    parseWidgetDate, 
    initializeFormWithInstance,
    getTokenFromLocalStorage,
    setTokenInLocalStorage,
    getActionComponent,
    removeTokenFromLocalStorage,
    getOwnPropsParams
} from '../src/utils/appService';
import '../src/init';

const unroll = require<any>('unroll');

unroll.use(it);

export interface IActions {
    type?: string;
    model?: string;
    value?: BaseModel;
}

describe('Test for AppService', () => {

    it('returns the environment', () => {
        let newEnv: string = 'new Env';
        let oldEnv: string = process.env.NODE_ENV;
        process.env.NODE_ENV = newEnv;

        expect(getEnvironment()).toEqual(newEnv);
        process.env.NODE_ENV = oldEnv;
    });

    unroll('tests the isEmpty function when the object is #params', (done, testArgs) => {
        let obj: Object;
        try {
             obj = JSON.parse(testArgs.params);
        } catch (e) {
            obj = testArgs.params;
        }

        let isObjectEmpty: boolean = isEmpty(obj);
        expect(isObjectEmpty).toEqual(testArgs.result);
        done();
    }, [
        ['params', 'result'],
        [JSON.stringify({id: 1}), false],
        ['abc', false],
        [1, true],
        [JSON.stringify({}), true]
    ]);

    unroll('returns the model string for the FormInputs with modelString array #array', (done, testArgs) => {

        let modelString: string = getModelString(...testArgs.array);
        expect(modelString).toEqual(`rhForms.${testArgs.array.join('.')}`);
        done();
    }, [
        ['array'],
        [[1, 2, 3]],
        [['model1', 'model2']]
    ]);

    unroll('checks whether #object1 and #object2 are equal', (done, testArgs) => {
        let object1: Object;
        let object2: Object;

        try {
            object1 = JSON.parse(testArgs.object1);
        } catch (e) {
            object1 = testArgs.object1;
        }

        try {
            object2 = JSON.parse(testArgs.object2);
        } catch (e) {
            object2 = testArgs.object2;
        }
        
        expect(objectEquals(object1, object2)).toEqual(testArgs.areObjectsEqual);
        done();
    }, [
            ['object1', 'object2', 'areObjectsEqual'],
            [JSON.stringify({}), JSON.stringify({}), true],
            [JSON.stringify({id: 1}), JSON.stringify({id: 1}), true],
            [JSON.stringify({id: 1}), JSON.stringify({id: 2}), false],
            [1, 2, false],
            [1, 1, true],
            ['abc', 'abc', true],
            ['abc', 'ab', false]
    ]);

    unroll('constructs the date string from #date required by the date form control', (done, testArgs) => {
        let dateString: string = parseWidgetDate(testArgs.date);

        expect(dateString).toEqual(testArgs.dateString);
        done();
    }, [
            ['date', 'dateString'],
            ['abc', 'Invalid date'],
            ['1479933241738', '2016-11-24'],
            [1479933241738, '2016-11-24']
    ]);

    describe('Tests the initializeFormWithInstance method', () => {

        class TestModel extends BaseModel {
            static resourceName: string = 'test';
            static propTypes = {
                id: ModelPropTypes.NUMBER()
            };
            static defaultProps = {
                id: 0
            };
            constructor(props) {
                super(props);
            }
        }

        unroll('initializes the redux form model with an instance with properties #properties', (done, testArgs) => {
            let properties: {id?: number} = JSON.parse(testArgs.properties);
            let testInstance: TestModel = new TestModel(properties);
            initializeFormWithInstance<TestModel>(testInstance, testArgs.isCreatePage);
            let actions: IActions[] = (store as IMockStore).getActions();
            (store as IMockStore).clearActions();
            expect(actions.length).toEqual(testArgs.numberOfActions);
            if (!actions.length) {
                return;
            }
            let action: IActions = actions[0];
            expect(action.type).toEqual('rrf/change');
            expect(action.model).toEqual(`rhForms.${TestModel.resourceName}${testArgs.formModelSuffix}`);
            expect(action.value).toEqual(testInstance);
            done();
        }, [
                ['properties', 'numberOfActions', 'isCreatePage', 'formModelSuffix'],
                [JSON.stringify({id: 1}), 1, true, 'Create'],
                [JSON.stringify({}), 1, true, 'Create'],
                [JSON.stringify({id: 1}), 1, false, 'Edit'],
                [JSON.stringify({}), 1, false, 'Edit']
        ]);

        it('does not initialize the form models with an instance if the instance ' + 
                'is an invalid BaseModel instance', () => {
            let instance: TestModel = new TestModel({});
            instance.properties = {};

            initializeFormWithInstance(instance, true);

            let actions = (store as IMockStore).getActions();
            expect(actions.length).toEqual(0);
        });

    });

    unroll('tries to get value from #keyPath and returns #defaultValue if not found', (done, testArgs) => {
        let object = JSON.parse(testArgs.object);
        if (testArgs.fromJS) {
            object = fromJS(object);
        }
        expect(getIn(object, testArgs.keyPath, testArgs.defaultValue)).toEqual(testArgs.valueReturned);
        done();
    }, [
        ['object', 'keyPath', 'defaultValue', 'valueReturned', 'fromJS'],
        [JSON.stringify({id: 10}), 'id', 1, 10, false],
        [JSON.stringify({id: 10}), 'id.name', 1, 1, false],
        [JSON.stringify({id: {name: 'abc'}}), 'id', 1, {name: 'abc'}, false],
        [JSON.stringify({id: 10}), 'id', 1, 10, true],
        [JSON.stringify({id: 10}), 'id.name', 1, 1, true],
        [JSON.stringify({id: {name: 'abc'}}), 'id', 1, {name: 'abc'}, true],
        [JSON.stringify({id: 10}), 'id.name', 1, 1, true]
    ]);

    unroll('It should #operation the authentication token in the local storage', (
            done: () => void,
            args: {operation: string, tokenValue: string}
    ) => {    
        localStorage.setItem = jest.fn<void>();
        setTokenInLocalStorage(args.tokenValue);
        if (args.tokenValue) {
            expect(localStorage.setItem).toBeCalled();
        } else {
            expect(localStorage.setItem).not.toBeCalled();
        }
        done();
    }, [
        ['operation', 'tokenValue'],
        ['save', 'qwerty12345'],
        ['not save', '']
    ]);

    setTokenInLocalStorage('qwerty12345');
    unroll('It should return #tokenValue if the token is #status in the local storage.', (
            done: () => void,
            args: {tokenValue: string, status: string}
    ) => {
        expect(getTokenFromLocalStorage()).toEqual(args.tokenValue);
        localStorage.clear();
        done();
    }, [
        ['status', 'tokenValue'],
        ['present', 'qwerty12345'],
        ['not present', '']
    ]);

    it('should delete the token from the local storage.', (): void => {
        localStorage.removeItem = jest.fn<void>();
        removeTokenFromLocalStorage();
        expect(localStorage.removeItem).toBeCalledWith('AUTH_TOKEN_KEY');
        expect(localStorage.removeItem).toBeCalledWith('AUTH_TOKEN_KEY_TIMESTAMP');
    });

    it('should get the resource and resourceID from getOwnPropsParams.', (): void => {
        expect(getOwnPropsParams('/blog/edit/34')).toEqual({resource: 'blog', resourceID: '34'})
    });
});
