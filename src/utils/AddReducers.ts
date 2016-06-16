import {open} from '../components/common/reducers/reducers';
import {combineReducers} from 'redux';
import {Reducer} from 'redux';

export const addReducers = (userReducers: Reducer): Reducer => {
	return combineReducers({
		userReducers,
		open
	});
};
