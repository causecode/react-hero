import BaseModel from '../src/models/BaseModel';
jest.unmock('../src/containers/PagedList');
jest.mock('react-bootstrap');
import {Pagination} from 'react-bootstrap';
import DataGrid from '../src/components/PagedList/DataGrid';
import {PagedListImpl} from '../src/containers/PagedList';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {Link} from 'react-router';
import {setPage} from '../src/actions/data';
jest.mock('../src/store/store');
import {store} from '../src/store/store';
import {Provider} from 'react-redux';
import {PagedListFilters} from '../src/components/PagedList/Filters/PagedListFilter';
import {Wrapper} from './Wrapper';

const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');

interface ITestModel extends IBaseModel {
    instanceData: {
        id: string;
        author: string;
    };
}

describe('Test Paged List', () => {
    let properties: string[], instanceList: ITestModel[], totalCount: number, setPage: (pageNumber: number) => void,
            activePage: number, resource: string, fetchInstanceList: (resource: string, offset?: number) => void,
            renderer: React.ShallowRenderer;
    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        properties = ['id', 'author'];
        instanceList = [new BaseModel({id: '1', author: 'abc'}), new BaseModel({id: '6', author: 'xyz'}) ];
        resource = 'test';
        totalCount = instanceList.length;
        activePage = 1;
        fetchInstanceList = jest.fn();
        setPage = (pageNumber: number) => { activePage = pageNumber; };
    });

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
        let page = renderer.getRenderOutput<React.Component<{}, {}>>();

        let pagination = ShallowTestUtils.findAllWithType(page, Pagination);
        let grid = ShallowTestUtils.findAllWithType(page, DataGrid);
        let link = ShallowTestUtils.findAllWithType(page, Link);
        let filters = ShallowTestUtils.findAllWithType(page, PagedListFilters);

        expect(pagination.length).toBe(1);
        expect(pagination[0].props.activePage).toEqual(activePage);
        expect(pagination[0].props.items).toEqual(Math.ceil(totalCount / instanceList.length));
        expect(link.length).toBe(1);
        expect(link[0].props.to).toEqual(`${resource}/create`);
        expect(filters.length).toBe(1);
        expect(ShallowTestUtils.findAllWithClass(filters[0], 'test-filter').length).toEqual(1);
        expect(fetchInstanceList).toBeCalledWith(resource, 0);
        expect(grid.length).toBe(1);
        expect(grid[0].props.instanceList).toEqual(instanceList);
        expect(grid[0].props.properties).toEqual(properties);

    });

    it('renders a PagedList without a resource', () => {

        expect(() => renderer.render(
            <PagedListImpl/>
        )).toThrow(new Error('No resource name passed.'));

    });

    it('renders a PagedList with a resource', () => {
        renderer.render(
            <PagedListImpl
                resource={resource}
            />
        );

        let page = renderer.getRenderOutput<React.Component<{}, {}>>();

        let pagination = ShallowTestUtils.findAllWithType(page, Pagination);
        let grid = ShallowTestUtils.findAllWithType(page, DataGrid);
        let link = ShallowTestUtils.findAllWithType(page, Link);
        let filters = ShallowTestUtils.findAllWithType(page, PagedListFilters);

        expect(pagination.length).toBe(1);
        expect(pagination[0].props.activePage).toEqual(1);
        expect(pagination[0].props.items).toEqual(1);
        expect(link.length).toBe(1);
        expect(link[0].props.to).toEqual(`${resource}/create`);
        expect(filters.length).toBe(1);
        expect(filters[0].props.children).toBeFalsy();
        expect(fetchInstanceList).not.toBeCalled();
        expect(grid.length).toBe(1);
        expect(grid[0].props.instanceList).toEqual([]);
        expect(grid[0].props.properties).toEqual([]);
    } );

});
