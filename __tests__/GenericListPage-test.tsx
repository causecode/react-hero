import {IGenericListPage} from '../src/components/CRUD/GenericListPage';
jest.unmock('../src/components/CRUD/GenericListPage');
jest.mock('../src/components-stateful/PagedList');
import {GenericListPage} from '../src/components/CRUD/GenericListPage';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import {store} from '../src/store/store';
import {Provider} from 'react-redux';
import {PagedList} from '../src/components-stateful/PagedList';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test Generic List Page', () => {

    unroll('renders a simple GenericListPage #title', (done,
            testArgs: {page: React.DOMElement, resource: string}) => {

        let renderPage = testArgs.page;
        let page: React.Component<IGenericListPage, void> =
            TestUtils.renderIntoDocument<React.Component<IGenericListPage, void>>(
                renderPage
            );

        expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'list-page'));
        let pagedList: any = TestUtils.findRenderedComponentWithType(page, PagedList);
        expect(pagedList).toBeTruthy();
        expect(pagedList.props.resource).toEqual(testArgs.resource);
        done();
    }, [
        ['title', 'page', 'resource'],
        ['with props', <GenericListPage resource="test"/>, 'test'],
        ['without props', <GenericListPage />, '']
    ]);
});
