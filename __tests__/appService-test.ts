import {getEnvironment} from '../src/utils/appService';
jest.unmock('../src/utils/appService');
import '../src/utils/appService';

describe('Test for AppService', () => {

    it('capitalizes the 1st letter', () => {
        expect('test'.capitalize()).toBe('Test');
        expect ('1'.capitalize()).toBe('1');
    });

    it('returns the environment', () => {
        let newEnv: string = 'new Env';
        let oldEnv: string = process.env.NODE_ENV;
        process.env.NODE_ENV = newEnv;

        expect(getEnvironment()).toEqual(newEnv);
        process.env.NODE_ENV = oldEnv;
    });

});
