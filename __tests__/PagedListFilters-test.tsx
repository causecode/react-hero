jest.unmock('../src/components/paged-list/Filters/PagedListFilter');

import * as React from 'react';
import {PagedListFilters} from '../src/components/paged-list/Filters/PagedListFilter';
import {IPagedListFiltersProps} from '../src/interfaces';
import {QueryFilter} from '../src/components/paged-list/Filters/QueryFilter';
import {ShallowWrapper, shallow} from 'enzyme';
import {toggleFilters} from '../src/actions/modelActions';
import {TOGGLE_FILTERS} from '../src/constants';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for PagedListFilters', () => {

    const emptyPagedListFilter: ShallowWrapper<IPagedListFiltersProps, void> = shallow<IPagedListFiltersProps, void> (
            <PagedListFilters></PagedListFilters>
    );

    const pagedListFilters: ShallowWrapper<IPagedListFiltersProps, void> = shallow<IPagedListFiltersProps,  void> (
            <PagedListFilters>
                <QueryFilter label="Search" paramName="query" placeholder="Search" />
            </PagedListFilters>
    );

    unroll('should render #count #element', (done, args) => {
        expect(args.component.find(args.element).length).toBe(args.count);
        done();
    }, [
        ['component', 'element', 'count'],
        [emptyPagedListFilter, 'Button', 0],
        [emptyPagedListFilter, 'div', 0],
        [pagedListFilters, 'Button', 1],
        [pagedListFilters, 'div', 1]
    ]);

    toggleFilters = jest.fn(() => {
        return {
            type: TOGGLE_FILTERS
        };
    });

    it('should call toggleChange when filterButton is clicked', () => {
         expect(toggleFilters).not.toBeCalled();
         pagedListFilters.find('Button').simulate('click');
         expect(toggleFilters).toBeCalled();
    });
});
