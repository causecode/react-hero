import {addReducers} from '../src/utils/addReducers';
jest.mock('../src/store/index');
jest.mock('redux');
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {dataReducer as data} from '../src/reducers/data';
import {open} from '../src/reducers/open';
const reduxFormReducer = require<any>('redux-form').reducer;
let {combineForms} = require<any>('react-redux-form');
const constants = require<{combinedForms: string}>('../__mocks__/constants');

describe('Test AddReducers', () => {

    it('calls AddReducers', () => {
        let testReducer = (state, action) => { return; } ;

        addReducers({userReducer: testReducer});

        expect(combineForms).toBeCalledWith({
            RHForms: {}
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
