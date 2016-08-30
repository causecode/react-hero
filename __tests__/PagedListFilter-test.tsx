import {FilterForm} from '../src/components/PagedList/Filters/DynamicForm';
jest.unmock('../src/components/PagedList/Filters/PagedListFilter');
import {PagedListFilters} from '../src/components/PagedList/Filters/PagedListFilter';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {initializeTestCase} from './../src/utils/initializeTestCase';
const ShallowTestUtils: any = require<any>('react-shallow-testutils');
import {Button} from 'react-bootstrap';
import {DateRangeFilter} from '../src/components/PagedList/Filters/DateRangeFilter';
import {DropDownFilter} from '../src/components/PagedList/Filters/DropDownFilter';
import {QueryFilter} from '../src/components/PagedList/Filters/QueryFilter';
import {RangeFilter} from '../src/components/PagedList/Filters/RangeFilter';
import {IInitializerData} from './../src/utils/initializeTestCase';
import {DynamicForm} from '../src/components/PagedList/Filters/DynamicForm';

describe('Test PagedList Filters', () => {
    let { renderer, resource }: IInitializerData = initializeTestCase();

    it('renders a simple PagedListFilters Component', () => {
        renderer.render(
            <PagedListFilters resource={resource}>
                <div className="test-filter"></div>
            </PagedListFilters>
        );

        let filter: React.ReactElement<void> = renderer.getRenderOutput();
        expect(filter.props.children[1].props.resource).toEqual(resource);
        expect(ShallowTestUtils.findWithClass(filter, 'paged-list-filters')).toBeTruthy();
        expect(ShallowTestUtils.findAllWithType(filter, 'div').length).toEqual(2);
        expect(ShallowTestUtils.findWithType(filter, Button)).toBeTruthy();
        expect(ShallowTestUtils.findWithType(filter, 'i')).toBeTruthy();
    });

    it('renders a simple PagedListFilters Component with a few Filters', () => {
        let children = [
            <DropDownFilter
                label="status"
                paramName="status"
                possibleValues={['enable', 'disable', 'inactive']}
                key="1"
            />,
            <RangeFilter
                label="Bill Amount"
                paramName="billAmount"
                key="2"
            />,
            <DateRangeFilter
                label="Date Created"
                paramName="dateCreated"
                key="3"
            />,
            <DropDownFilter
                label="types"
                paramName="types"
                possibleValues={['Zoo', 'Jungle', 'Forest']}
                key="4"
            />,
            <QueryFilter
                label="Search"
                paramName="query"
                placeholder={['First Name', 'Last Name', 'Email']}
                key="5"
            />
        ];
        renderer.render(
            <PagedListFilters>
                {children}
            </PagedListFilters>
        );

        let filter: React.ReactElement<void> = renderer.getRenderOutput();

        expect(ShallowTestUtils.findWithClass(filter, 'paged-list-filters')).toBeTruthy();
        expect(ShallowTestUtils.findWithType(filter, Button)).toBeTruthy();
        let fields: string[] = ['status',
                                'billAmountFrom',
                                'billAmountTo',
                                'dateCreatedFrom',
                                'dateCreatedTo',
                                'types',
                                'query'];
        expect(filter.props.children[1].props.fields).toEqual(fields);
    });

    it('renders a PagedListFilter Component without any children', () => {
        renderer.render(
            <PagedListFilters />
        );

        let filter: React.ReactElement<void> = renderer.getRenderOutput();
        let child: Element = ShallowTestUtils.findWithType(filter, 'div');
        expect(child).toBeTruthy();
        expect(child.props.children).toBeFalsy();
    });

    it('renders a PagedListFilter Component without a resource prop', () => {
        renderer.render(
            <PagedListFilters>
                <div className="test-filter"></div>
            </PagedListFilters>
        );

        let filter: React.ReactElement<void> = renderer.getRenderOutput();

        expect(ShallowTestUtils.findWithClass(filter, 'test-filter')).toBeTruthy();
        expect(ShallowTestUtils.findWithType(filter, Button)).toBeTruthy();
        expect(ShallowTestUtils.findAllWithType(filter, 'div').length).toEqual(2);
        expect(ShallowTestUtils.findWithType(filter, 'i')).toBeTruthy();
    });
});
