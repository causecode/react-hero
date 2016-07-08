import ComponentClass = __React.ComponentClass;
jest.unmock('../src/components/CRUD/GenericListPage');
jest.mock('../src/containers/PagedList');
import GenericListPage from '../src/components/CRUD/GenericListPage';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import {store} from '../src/store/store';
import {Provider} from 'react-redux';

describe('Test Generic List Page', () => {

    it('renders a simple GenericListPage', () => {
        let page = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
            <GenericListPage params={{resource: 'test'}}/>
        );

        expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'list-page'));
    });
});
