import * as React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import {ComponentService} from './utils/componentService';
import {ModelService} from './utils/modelService';
import {Provider} from 'react-redux';
import {NewPage} from './demo/testImplementations';
import {render} from 'react-dom';
import {store} from './store';

ModelService.registerAll();
ComponentService.registerAll();

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="*" component={NewPage} />
        </Router>
    </Provider>,
    document.getElementsByClassName('main-container')[0]
);
