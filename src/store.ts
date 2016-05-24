import {IStore} from "redux";
import {createStore} from "redux";

const initialState = {
};

const fooAction = (state, action) => { }

export const store: IStore<any> = createStore(fooAction, initialState);