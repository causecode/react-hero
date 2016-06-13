// Commented out for usage as a plugin
//export {store} from "./store";
import {NewPage} from "./components/TestImplementations";
import {Router, Route, browserHistory} from "react-router";
import * as React from 'react';
import {render} from 'react-dom';
//import * from "./components/HeaderFooterLayout";


render(
	<Router history={browserHistory}>
		<Route path="/" component={NewPage} />
	</Router>,
	document.getElementsByClassName('main-container')[0]
);
