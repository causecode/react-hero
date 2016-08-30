import {BaseModel} from '../src/models/BaseModel';
jest.unmock('../src/components-stateful/PagedList');
jest.mock('react-bootstrap');
jest.unmock('../src/reducers/data');
jest.unmock('../src/actions/modelActions');
import {Pagination} from 'react-bootstrap';
import {DataGrid} from '../src/components/PagedList/DataGrid';
import {PagedListImpl, PagedList} from '../src/components-stateful/PagedList';
import {PagedListFilters} from '../src/components/PagedList/Filters/PagedListFilter';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {Link} from 'react-router';
import {Provider} from 'react-redux';
import {PagedListFilters} from '../src/components/PagedList/Filters/PagedListFilter';
import {Wrapper} from './../src/components/Wrapper';
import {IShallowTestUtils} from '../src/interfaces/interfaces';
import {IPagedListProps} from '../src/components-stateful/PagedList';
import * as actions from '../src/actions/modelActions';
import {Store, createStore} from 'redux';
import {dataReducer} from '../src/reducers/data';

const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');

describe('Test Paged List', () => {
    let renderer: React.ShallowRenderer;
    let properties: string[] = ['id', 'author'];
    let instanceList: BaseModel[] = [new BaseModel({id: '1', author: 'abc'}),
            new BaseModel({id: '6', author: 'xyz'}) ];
    let resource: string = 'test';
    let totalCount: number = instanceList.length;
    let activePage: number = 1;
    let max: number = 1;
    let setPage = (pageNumber: number): void => { activePage = pageNumber; };

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        BaseModel.list = jest.fn<Function>();
    });

    function testPaginationGridAndLink(
        page: React.ReactElement<void>,
        activePageParam: number,
        items: number,
        instanceListParam: BaseModel[],
        propertiesParam: string[]
    ) {
        let pagination = ShallowTestUtils.findAllWithType(page, Pagination);
        let grid = ShallowTestUtils.findAllWithType(page, DataGrid);
        let link = ShallowTestUtils.findAllWithType(page, Link);

        expect(pagination.length).toEqual(1);
        expect(pagination[0].props.activePage).toEqual(activePageParam);
        expect(pagination[0].props.items).toEqual(items);
        expect(link.length).toEqual(1);
        expect(link[0].props.to).toEqual(`${resource}/create`);
        expect(grid.length).toEqual(1);
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
                activePage={activePage}
                setPage={setPage}
                max={max}>
                <div className="test-filter"></div>
            </PagedListImpl>
        );
        let page: React.ReactElement<void> =
                renderer.getRenderOutput();
        
        let tags = ['h2', PagedListFilters, DataGrid, Pagination];
        page.props.children.forEach((item, index) => {
            expect(item.type).toBe(tags[index]);
        });

        testPaginationGridAndLink(page, activePage, (totalCount / max), instanceList, properties);

        let filters = ShallowTestUtils.findAllWithType(page, PagedListFilters);
        expect(filters.length).toBe(1);
        expect(BaseModel.list).toBeCalledWith({max: max});
        expect(ShallowTestUtils.findAllWithClass(filters[0], 'test-filter').length).toEqual(1);

    });

    it('renders a PagedList with a resource', () => {
        renderer.render(
            <PagedListImpl resource={resource}/>
        );

        let page: React.ReactElement<void> = renderer.getRenderOutput();
        expect(page.props.children[1].props.resource).toBe(resource);
        expect(page.props.children[2].props.instanceList).not.toBe(undefined);
        expect(page.props.children[2].props.properties).not.toBe(undefined);
        expect(page.props.children[3].props.activePage).toBe(1);
        testPaginationGridAndLink(page, 1, 0, [], []);

        let filters = ShallowTestUtils.findAllWithType(page, PagedListFilters);
        expect(filters.length).toBe(1);
        expect(BaseModel.list).toBeCalled();
        expect(filters[0].props.children).toBeFalsy();
    } );

    it('renders a PagedList without a resource', () => {
        expect(() => renderer.render(
            <PagedListImpl/>
        )).toThrow(new Error('No resource name passed.'));
    });

    it('checks whether correct key is created in the store.', () => {
        const store: Store = createStore(dataReducer);
        let pageNumber: number = 12;
        store.dispatch(actions.setPage(pageNumber, resource));
        expect(store.getState().has(`${resource}List`)).toBeTruthy();
        expect(store.getState().get(`${resource}List`).get('activePage')).toBe(pageNumber);
    });

});
