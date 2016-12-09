jest.unmock('../src/utils/appService.tsx');
jest.unmock('immutable');

import {BaseModel} from '../src/models/BaseModel';
import {store, IMockStore} from '../src/store';
import {fromJS} from 'immutable';
import {
    getIn, 
    getModelString, 
    getEnvironment, 
    isEmpty, 
    objectEquals, 
    parseWidgetDate, 
    initializeFormWithInstance
} from '../src/utils/appService';
import {ModelPropTypes} from '../src/models/ModelPropTypes';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Test for AppService', () => {

    it('returns the environment', () => {
        let newEnv: string = 'new Env';
        let oldEnv: string = process.env.NODE_ENV;
        process.env.NODE_ENV = newEnv;

        expect(getEnvironment()).toEqual(newEnv);
        process.env.NODE_ENV = oldEnv;
    });

    unroll('tests the isEmpty function when the object is #object', (done, testArgs) => {
        let obj: Object;
        try {
             obj = JSON.parse(testArgs.object);
        } catch (e) {
            obj = testArgs.object;
        }

        let isObjectEmpty = isEmpty(obj);
        expect(isObjectEmpty).toEqual(testArgs.isObjectEmpty);
        done();
    }, [
            ['object', 'isObjectEmpty'],
            [JSON.stringify({id: 1}), false],
            ['abc', false],
            [1, true],
            [JSON.stringify({}), true]
    ]);

    unroll('returns the model string for the FormInputs with modelString array #array', (done, testArgs) => {

        let modelString: string = getModelString(...testArgs.array);
        expect(modelString).toEqual(`RHForms.${testArgs.array.join('.')}`);
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
            [1479933241738, '2016-11-24'],
            [new Date(), '2016-11-24']
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
            let properties = JSON.parse(testArgs.properties);
            let testInstance: TestModel = new TestModel(properties);
            initializeFormWithInstance<TestModel>(testInstance, testArgs.isCreatePage);
            let actions = (store as IMockStore).getActions();
            (store as IMockStore).clearActions();
            expect(actions.length).toEqual(testArgs.numberOfActions);
            if (!actions.length) {
                return;
            }
            let action = actions[0];
            expect(action.type).toEqual('rrf/change');
            expect(action.model).toEqual(`RHForms.${TestModel.resourceName}${testArgs.formModelSuffix}`);
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
            let instance = new TestModel({});
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

});
