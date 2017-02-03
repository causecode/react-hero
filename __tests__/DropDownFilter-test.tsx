jest.unmock('../src/components/PagedList/Filters/DropDownFilter');

import * as React from 'react';
import {DropDownFilter, IDropDownFilter} from '../src/components/PagedList/Filters/DropDownFilter';
import {ShallowWrapper, shallow} from 'enzyme';
import {IDropDownFilterValueMap} from '../src/interfaces';
import '../src/init';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for DropDownFilter', () => {

    let possibleValues: IDropDownFilterValueMap[] = [
        {label: 'India', value: 'india'},
        {label: 'United Kingdom', value: 'uk'}
    ];

    const dropDownFilter: ShallowWrapper<IDropDownFilter, void> = shallow<IDropDownFilter,  void> (
        <DropDownFilter label="Country" paramName="countryName" possibleValues={possibleValues} />
    );

    unroll('should render #count #component', (done, args) => {
        expect(dropDownFilter.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['FormGroup', 1],
        ['ControlLabel', 1],
        ['Field', 1]
    ]);

    it('should render label correctly', () => {
        expect(dropDownFilter.find('ControlLabel').props()[`children`]).toEqual('Country'); 
    });
    
    it('should render paramName as label when label is not provided', () => {
        dropDownFilter.setProps({label: undefined});
        expect(dropDownFilter.find('ControlLabel').props()[`children`]).toEqual('CountryName'); 
    });

    unroll('Field should render #prop correctly', (done, args) => {
        expect(dropDownFilter.find('Field').props()[args.prop]).toEqual(args.value);
        done();
    }, [
        ['prop', 'value'],
        ['name', 'countryName'],
        ['possibleValues', possibleValues]
    ]);
});
