// Commented out for usage as a plugin
import {store} from './store/store';
import {NewPage} from './Demo/TestImplementations';
import {Router, Route, hashHistory} from 'react-router';
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ModelService} from "./utils/modelService";
import BlogModel from "./Demo/TestModel";

ModelService.register(BlogModel);

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="*" component={NewPage} />
        </Router>
    </Provider>,
    document.getElementsByClassName('main-container')[0]
);
