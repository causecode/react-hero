// Commented out for usage as a plugin
import {store} from './store/store';
import {NewPage} from './components/TestImplementations';
import {Router, Route, hashHistory} from 'react-router';
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="*" component={NewPage} />
        </Router>
    </Provider>,
    document.getElementsByClassName('main-container')[0]
);