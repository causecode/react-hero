jest.unmock('../src/components/CRUD/GenericListPage');
jest.mock('../src/components-stateful/PagedList');

import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {IGenericListPageProps} from '../src/components/CRUD/GenericListPage';
import {GenericListPage} from '../src/components/CRUD/GenericListPage';
import {PagedList} from '../src/components-stateful/PagedList';

const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test Generic List Page', () => {

    unroll('renders a simple GenericListPage #title', (done,
            testArgs: {page: React.DOMElement, resource: string}) => {

        let renderPage = testArgs.page;
        let page: React.Component<IGenericListPageProps, void> =
            TestUtils.renderIntoDocument<React.Component<IGenericListPageProps, void>>(
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
