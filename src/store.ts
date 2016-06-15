import {open} from './components/common/reducers/reducers';
import {Store, compose, createStore} from "redux";
import {syncHistoryWithStore, routerReducer} from "react-router-redux";
import {combineReducers} from "redux";
import {IStore} from "~react-router-redux~redux/redux";

const initialState = {
	open: false
};

// TODO Fix Reducer Type Error here on Toggle.
export const store: any = createStore(
	combineReducers({
		open,
		routing: routerReducer
	}),
	initialState,
	compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
));
