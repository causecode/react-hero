import BaseModel from '../src/models/BaseModel';
jest.unmock('../src/utils/modelService');
import {ModelService} from '../src/utils/modelService';
import {resolver} from '../src/resolver';

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

    describe ('Model Service retrieval functions', () => {

        beforeEach(() => {
            ModelService.register(TestModel);
        });

        it('checks if the specified model has been regsitered', () => {

            expect(ModelService.hasModel('test')).toBe(true);
            expect(ModelService.hasModel('testModel')).toBe(true);
            expect(ModelService.hasModel('Testmodel')).toBe(true);
            expect(ModelService.hasModel('abc')).toBe(false);
            expect(ModelService.hasModel('abcModel')).toBe(false);

        });

        it('gets the specified Model', () => {

            expect(ModelService.getModel('test')).toEqual(TestModel);
            expect(ModelService.getModel('testModel')).toEqual(TestModel);
            expect(ModelService.getModel('Testmodel')).toEqual(TestModel);
            expect(ModelService.getModel('abcModel')).toEqual(BaseModel);
            expect(ModelService.getModel('abc')).toEqual(BaseModel);

        });

    });
});
