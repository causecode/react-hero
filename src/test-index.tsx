import {store} from './store/store';
import {NewPage} from './Demo/TestImplementations';
import {Router, Route, hashHistory} from 'react-router';
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ModelService} from "./utils/modelService";
import {ComponentService} from "./utils/componentService";
import {BlogModel} from "./Demo/TestModel";
import {UserModel} from "./Demo/TestModel";
import resolver from './resolver';

ModelService.register(BlogModel);
ModelService.register(UserModel);

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="*" component={NewPage} />
        </Router>
    </Provider>,
    document.getElementsByClassName('main-container')[0]
);
