jest.unmock('../src/utils/appService');
import '../src/utils/appService';

describe('Test for AppService', () => {

    it('capitalizes the 1st letter', () => {
        expect('test'.capitalize()).toBe('Test');
        expect ('1'.capitalize()).toBe('1');
    });

});
