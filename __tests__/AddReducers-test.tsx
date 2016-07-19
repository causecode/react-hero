import {addReducers} from '../src/utils/AddReducers';
import {Reducer} from 'redux';
import {combineReducers} from 'redux';
jest.mock('../src/store/store');
const formReducer = require<any>('redux-form').reducer;
import {routerReducer} from 'react-router-redux';
import instances from '../src/reducers/instanceReducer';
import data from '../src/reducers/data';
import open from '../src/reducers/open';

describe('Test Add reducers', () => {

    it('calls AddReducers', () => {
        combineReducers = jest.fn<Function>();
        let testReducer: jest.Mock<Reducer> = jest.fn<Reducer>();

        addReducers(testReducer);

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
