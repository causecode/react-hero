jest.unmock('../src/components/paged-list/Filters/DropDownSelect');

import * as React from 'react';
import {DropDownSelect, IDropDownSelectProps} from '../src/components/paged-list/Filters/DropDownSelect';
import {ShallowWrapper, shallow} from 'enzyme';
import {IDropDownFilterData} from '../src/interfaces';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for DropDownSelect', () => {

    let possibleValues: IDropDownFilterData[] = [
        {label: 'India', value: 'india'},
        {label: 'United Kingdom', value: 'uk'}
    ];

    let handleChange: jest.Mock<void> = jest.fn<void>();

    const dropDownSelect: ShallowWrapper<IDropDownSelectProps, void> = shallow<IDropDownSelectProps,  void> (
            <DropDownSelect input={{onChange: handleChange, value: 'india'}} possibleValues={possibleValues} />
    );

    unroll('should render #count #component', (done, args) => {
        expect(dropDownSelect.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['FormControl', 1],
        ['option', 3]
    ]);

    unroll('should render #prop correctly', (done, args) => {
        expect(dropDownSelect.props()[args.prop]).toEqual(args.propValue);
        done();
    }, [
        ['prop', 'propValue'],
        ['value', 'india'],
        ['onChange', handleChange]
    ]);

    it('should call handleChange function when a value is selected from dropdown filter', () => {
        expect(handleChange).not.toBeCalled();
        dropDownSelect.find('FormControl').simulate('change');
        expect(handleChange).toBeCalled(); 
    });
});
