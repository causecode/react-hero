jest.unmock('../src/components/PagedList/Filters/PagedListFilter');

import * as React from 'react';
import {PagedListFilters} from '../src/components/PagedList/Filters/PagedListFilter';
import {IPagedListFiltersProps} from '../src/interfaces';
import {QueryFilter} from '../src/components/PagedList/Filters/QueryFilter';
import {ShallowWrapper, shallow} from 'enzyme';
import {toggleFilters} from '../src/actions/modelActions';
import {TOGGLE_FILTERS} from '../src/constants';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for PagedListFilters', () => {

    const emptyPagedListFilter: ShallowWrapper<IPagedListFiltersProps, void> = shallow<IPagedListFiltersProps, void> (
            <PagedListFilters></PagedListFilters>
    );

    it('should render empty div when no filter is provided', () => {
        expect(emptyPagedListFilter.find('div').length).toEqual(1);
    });

    const pagedListFilters: ShallowWrapper<IPagedListFiltersProps, void> = shallow<IPagedListFiltersProps,  void> (
            <PagedListFilters>
                <QueryFilter label="Search" paramName="query" placeholder="Search" />
            </PagedListFilters>
    );

    unroll('should render #count #component', (done, args) => {
        expect(pagedListFilters.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['Button', 1],
        ['div', 1]
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
