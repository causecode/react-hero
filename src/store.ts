import {IStore} from "redux";
import {createStore} from "redux";
import {toggle} from './components/common/reducers/reducers';

const initialState = {
	open: false
};

export const store: IStore<any> = createStore(toggle, initialState);