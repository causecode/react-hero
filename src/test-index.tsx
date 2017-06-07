import * as React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
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
        <BrowserRouter>
            <Route path="/" component={NewPage} />
        </BrowserRouter>
    </Provider>,
    document.getElementsByClassName('main-container')[0]
);
