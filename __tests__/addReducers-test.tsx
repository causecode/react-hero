jest.mock('../src/store/index');
jest.mock('redux');

import {dataReducer as data} from '../src/reducers/data';
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {addReducers} from '../src/utils/addReducers';
import {open} from '../src/reducers/open';

const reduxFormReducer = require<any>('redux-form').reducer;
const constants = require<{combinedForms: string}>('../__mocks__/constants');
let {combineForms} = require<any>('react-redux-form');

describe('Test AddReducers', () => {
    
    it('calls AddReducers', () => {
        let testReducer = (state, action) => { return; } ;

        addReducers({userReducer: testReducer});

        expect(combineForms).toBeCalledWith({
            rhForms: {}
        });
        expect(combineReducers).toBeCalledWith({
            userReducer: testReducer,
            open,
            data,
            routing: routerReducer,
            form: reduxFormReducer,
            forms: constants.combinedForms 
        });

    });

});
