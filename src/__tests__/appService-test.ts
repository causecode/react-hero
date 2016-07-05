jest.unmock('../utils/appService');
import '../utils/appService';

describe('Test for AppService', () => {

    it('capitalizes the 1st letter', () => {
        expect('test'.capitalize()).toBe('Test');
        expect ('1'.capitalize()).toBe('1');
    });

});
