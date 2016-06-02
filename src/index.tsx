import * as React from 'react';
import {render} from 'react-dom';
import {IStore, createStore} from 'redux';
import {Provider} from "react-redux";
import {store} from "./store";
import {NewPage} from "./components/TestImplementations";
import {Router, Route, browserHistory} from "react-router";

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={NewPage} />
		</Router>
	</Provider>,
	document.getElementsByClassName('main-container')[0]
);
