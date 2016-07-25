import {addReducers} from '../src/utils/addReducers';
import {Reducer} from 'redux';
import {combineReducers} from 'redux';
jest.mock('../src/store/store');
const formReducer = require<any>('redux-form').reducer;
import {routerReducer} from 'react-router-redux';
import {modelReducer} from '../src/reducers/modelReducer';
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
            instances: modelReducer,
            data: data
        });

    });

});
