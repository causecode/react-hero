jest.unmock('../src/components/CRUD/GenericListPage');
jest.mock('../src/containers/PagedList');
import GenericListPage from '../src/components/CRUD/GenericListPage';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import {store} from '../src/store/store';
import {Provider} from 'react-redux';
import {PagedList} from '../src/containers/PagedList';

describe('Test Generic List Page', () => {

    it('renders a simple GenericListPage', () => {
        let page = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
            <GenericListPage resource="test"/>
        );

        expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'list-page'));
        let pagedList: any = TestUtils.findRenderedComponentWithType(page, PagedList);
        expect(pagedList).toBeTruthy();
        expect(pagedList.props.resource).toEqual('test');
    });

    it('renders a GenericListPage without props', () => {
        let page = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
            <GenericListPage/>
        );

        expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'list-page'));
        let pagedList: any = TestUtils.findRenderedComponentWithType(page, PagedList);
        expect(pagedList).toBeTruthy();
        expect(pagedList.props.resource).toEqual('');
    });
});
