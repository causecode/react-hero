jest.unmock('../src/components/PagedList/Filters/RangeFilter');

import * as React from 'react';
import {RangeFilter} from '../src/components/PagedList/Filters/RangeFilter';
import {IFilter} from '../src/interfaces';
import {ShallowWrapper, shallow} from 'enzyme';
import '../src/init';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for RangeFilter', () => {

    const rangeFilter: ShallowWrapper<IFilter, void> = shallow<IFilter,  void> (
            <RangeFilter label="Price Range" paramName="priceBetween" />
    );

    unroll('should render #count #component', (done, args) => {
        expect(rangeFilter.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['FormGroup', 1],
        ['ControlLabel', 1],
        ['strong', 2],
        ['Field', 2]
    ]);

    it('should render label correctly', () => {
        expect(rangeFilter.find('ControlLabel').props()[`children`]).toEqual('Price Range'); 
    });
    
    it('should render paramName as label when label is not provided', () => {
        rangeFilter.setProps({label: undefined});
        expect(rangeFilter.find('ControlLabel').props()[`children`]).toEqual('PriceBetween'); 
    });

    it('should render default input type as text', () => {
        rangeFilter.find('Field').forEach((field) => {
            expect(field.props()[`type`]).toEqual('text');
        });
    });

    it('should render custom input type when type prop is provided', () => {
        rangeFilter.setProps({type: 'number'});
        rangeFilter.find('Field').forEach((field) => {
            expect(field.props()[`type`]).toEqual('number');
        });
    });
});
