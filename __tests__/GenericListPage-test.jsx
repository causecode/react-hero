"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/CRUD/GenericListPage');
jest.mock('../src/components-stateful/paged-list');
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var GenericListPage_1 = require("../src/components/CRUD/GenericListPage");
var PagedList_1 = require("../src/components-stateful/PagedList");
var unroll = require('unroll');
unroll.use(it);
describe('Test Generic List Page', function () {
    unroll('renders a simple GenericListPage #title', function (done, testArgs) {
        var renderPage = testArgs.page;
        var page = TestUtils.renderIntoDocument(renderPage);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'list-page'));
        var pagedList = TestUtils.findRenderedComponentWithType(page, PagedList_1.PagedList);
        expect(pagedList).toBeTruthy();
        expect(pagedList.props.resource).toEqual(testArgs.resource);
        done();
    }, [
        ['title', 'page', 'resource'],
        ['with props', <GenericListPage_1.GenericListPage resource="test"/>, 'test'],
        ['without props', <GenericListPage_1.GenericListPage />, '']
    ]);
});
