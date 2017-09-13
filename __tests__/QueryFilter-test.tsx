jest.unmock('../src/components/paged-list/Filters/QueryFilter');

import * as React from 'react';
import {QueryFilter, IQueryFilter} from '../src/components/paged-list/Filters/QueryFilter';
import {ShallowWrapper, shallow} from 'enzyme';
import '../src/init';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for QueryFilter', () => {

    const queryFilter: ShallowWrapper<IQueryFilter, void> = shallow<IQueryFilter,  void> (
            <QueryFilter label="Search" paramName="query" placeholder="Start typing to search..." />
    );

    unroll('should render #count #component', (done, args) => {
        expect(queryFilter.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['FormGroup', 1],
        ['ControlLabel', 1],
        ['Field', 1]
    ]);

    it('should render label correctly', () => {
        expect(queryFilter.find('ControlLabel').props()[`children`]).toEqual('Search'); 
    });
    
    it('should render paramName as label when label is not provided', () => {
        queryFilter.setProps({label: undefined});
        expect(queryFilter.find('ControlLabel').props()[`children`]).toEqual('Query'); 
    });

    unroll('Field should render #prop correctly', (done, args) => {
        expect(queryFilter.find('Field').props()[args.prop]).toEqual(args.value);
        done();
    }, [
        ['prop', 'value'],
        ['type', 'text'],
        ['name', 'query'],
        ['placeholder', 'Start typing to search...']
    ]);
});
