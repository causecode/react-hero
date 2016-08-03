import {BaseModel} from '../src/models/BaseModel';
jest.unmock('../src/components-stateful/PagedList');
jest.mock('react-bootstrap');
import {Pagination} from 'react-bootstrap';
import {DataGrid} from '../src/components/PagedList/DataGrid';
import {PagedListImpl} from '../src/components-stateful/PagedList';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {Link} from 'react-router';
import {setPage} from '../src/actions/data';
jest.mock('../src/store/store');
import {store} from '../src/store/store';
import {Provider} from 'react-redux';
import {PagedListFilters} from '../src/components/PagedList/Filters/PagedListFilter';
import {Wrapper} from './../src/components/Wrapper';
import {IShallowTestUtils} from '../src/interfaces/interfaces';
import {IPagedListProps} from '../src/components-stateful/PagedList';

const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');

describe('Test Paged List', () => {
    let renderer: React.ShallowRenderer;
    let properties: string[] = ['id', 'author'];
    let instanceList: BaseModel[] = [new BaseModel({id: '1', author: 'abc'}),
            new BaseModel({id: '6', author: 'xyz'}) ];
    let resource: string = 'test';
    let totalCount: number = instanceList.length;
    let activePage: number = 1;
    let fetchInstanceList: jest.Mock<Function>;
    let setPage = (pageNumber: number): void => { activePage = pageNumber; };

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        fetchInstanceList = jest.fn();
    });

    function testPaginationGridAndLink(
        page: React.Component<IPagedListProps, void>,
        activePageParam: number,
        items: number,
        instanceListParam: BaseModel[],
        propertiesParam: string[]
    ) {
        let pagination = ShallowTestUtils.findAllWithType(page, Pagination);
        let grid = ShallowTestUtils.findAllWithType(page, DataGrid);
        let link = ShallowTestUtils.findAllWithType(page, Link);

        expect(pagination.length).toBe(1);
        expect(pagination[0].props.activePage).toEqual(activePageParam);
        expect(pagination[0].props.items).toEqual(items);
        expect(link.length).toBe(1);
        expect(link[0].props.to).toEqual(`${resource}/create`);
        expect(grid.length).toBe(1);
        expect(grid[0].props.instanceList).toEqual(instanceListParam);
        expect(grid[0].props.properties).toEqual(propertiesParam);
    }

    it('renders a simple PagedList', () => {
        renderer.render(
            <PagedListImpl
                instanceList={instanceList}
                properties={properties}
                resource={resource}
                totalCount={totalCount}
                fetchInstanceList={fetchInstanceList}
                activePage={activePage}
                setPage={setPage}>
                <div className="test-filter"></div>
            </PagedListImpl>
        );
        let page: React.Component<IPagedListProps, void> =
                renderer.getRenderOutput<React.Component<IPagedListProps, void>>();

        testPaginationGridAndLink(page, activePage, (totalCount / instanceList.length), instanceList, properties);

        let filters = ShallowTestUtils.findAllWithType(page, PagedListFilters);
        expect(filters.length).toBe(1);
        expect(fetchInstanceList).toBeCalledWith(resource, 0);
        expect(ShallowTestUtils.findAllWithClass(filters[0], 'test-filter').length).toEqual(1);

    });

    it('renders a PagedList with a resource', () => {
        renderer.render(
            <PagedListImpl
                resource={resource}
            />
        );

        let page: React.Component<IPagedListProps, void> =
                renderer.getRenderOutput<React.Component<IPagedListProps, void>>();

        testPaginationGridAndLink(page, 1, 1, [], []);

        let filters = ShallowTestUtils.findAllWithType(page, PagedListFilters);
        expect(filters.length).toBe(1);
        expect(fetchInstanceList).not.toBeCalled();
        expect(filters[0].props.children).toBeFalsy();
    } );

    it('renders a PagedList without a resource', () => {

        expect(() => renderer.render(
            <PagedListImpl/>
        )).toThrow(new Error('No resource name passed.'));

    });

});
