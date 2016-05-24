import * as React from 'react';
import {render} from 'react-dom';
import {IStore, createStore} from 'redux';
import {Provider} from "react-redux";
import {store} from "./store";

render(
	<Provider store={store}>
	</Provider>,
	document.getElementsByClassName('main-container')[0]
);
