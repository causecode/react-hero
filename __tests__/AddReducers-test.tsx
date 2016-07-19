import {addReducers} from '../src/utils/AddReducers';
import {Reducer} from 'redux';
import {combineReducers} from 'redux';
jest.mock('../src/store/store');
const formReducer = require<any>('redux-form').reducer;
import {routerReducer} from 'react-router-redux';
import {instanceReducer as instances} from '../src/reducers/instanceReducer';
import {dataReducer as data} from '../src/reducers/data';
import {open} from '../src/reducers/open';

describe('Test Add reducers', () => {

    it('calls AddReducers', () => {
        combineReducers = jest.fn<Function>();

        let testReducer = (state, action) => { return; } ;

        addReducers(testReducer as Reducer);

        expect(combineReducers).toBeCalledWith({
            userReducer: testReducer,
            open: open,
            form: formReducer,
            routing: routerReducer,
            instances: instances,
            data: data
        });

    });

});
