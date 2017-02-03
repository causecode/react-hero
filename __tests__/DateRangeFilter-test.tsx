jest.unmock('../src/components/PagedList/Filters/DateRangeFilter');

import * as React from 'react';
import {DateRangeFilter} from '../src/components/PagedList/Filters/DateRangeFilter';
import {IFilter} from '../src/interfaces';
import {ShallowWrapper, shallow} from 'enzyme';
import '../src/init';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for DateRangeFilter', () => {

    const dateRangeFilter: ShallowWrapper<IFilter, void> = shallow<IFilter,  void> (
        <DateRangeFilter label="Date Range" paramName="dateBetween" />
    );

    unroll('should render #count #component', (done, args) => {
         expect(dateRangeFilter.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['FormGroup', 1],
        ['ControlLabel', 1],
        ['strong', 2],
        ['Field', 2]
    ]);

    it('should render label correctly', () => {
        expect(dateRangeFilter.find('ControlLabel').props()[`children`]).toEqual('Date Range'); 
    });
    
    it('should render paramName as label when label is not provided', () => {
        dateRangeFilter.setProps({label: undefined});
        expect(dateRangeFilter.find('ControlLabel').props()[`children`]).toEqual('DateBetween'); 
    });
});
