jest.unmock('../src/utils/modelService');

import {getEnvironment} from '../src/utils/appService';
import {ModelService} from '../src/utils/modelService';
import {BaseModel} from '../src/models/BaseModel';
import {resolver} from '../src/resolver';

const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test Model Service', () => {

    class TestModel extends BaseModel {
        constructor() {
            super({id: 1, author: 'nahush'});
        }
    }

    it('registers the specified model', () => {
        ModelService.register(TestModel);

        expect(resolver.has('testmodel')).toBe(true);
        expect(ModelService.hasModel('test')).toBe(true);
    });

    it('registers all the specified Models', () => {
        class AbModel extends BaseModel {}
        ModelService.registerAll(TestModel, AbModel);

        expect(resolver.has('testmodel')).toBe(true);
        expect(resolver.has('abmodel')).toBe(true);
        expect(ModelService.hasModel('test')).toBe(true);
        expect(ModelService.hasModel('ab')).toBe(true);
    });

    it('logs a warning in the development Environment if model is not found', () => {
        let oldEnv: string = getEnvironment();
        process.env.NODE_ENV = 'development';
        console.warn = jest.fn<typeof console.warn>();
        ModelService.getModel('absentModel');
        expect(console.warn).toBeCalledWith(
            `Cannot find absentmodel, make sure you have registered it. Using Base Model instead.`
        );
        process.env.NODE_ENV = oldEnv;
    });

    describe ('Model Service retrieval functions', () => {

        beforeEach(() => {
            ModelService.register(TestModel);
        });

        unroll('checks if the #modelKey has been registered and can be fetched', (done, testArgs) => {

            let { modelKey, expectation, model } = testArgs;
            expect(ModelService.hasModel(modelKey)).toEqual(expectation);
            expect(ModelService.getModel(modelKey)).toEqual(model);
            done();

        }, [
                ['modelKey', 'expectation', 'model'],
                ['test', true, TestModel],
                ['testModel', true, TestModel],
                ['TestModel', true, TestModel],
                ['abc', false, BaseModel],
                ['abcModel', false, BaseModel]
        ]);

    });
});
