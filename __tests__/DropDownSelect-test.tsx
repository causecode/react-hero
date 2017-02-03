jest.unmock('../src/components/PagedList/Filters/DropDownSelect');

import * as React from 'react';
import {DropDownSelect, IDropDownValueProps} from '../src/components/PagedList/Filters/DropDownSelect';
import {ShallowWrapper, shallow} from 'enzyme';
import {IDropDownFilterValueMap} from '../src/interfaces';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for DropDownSelect', () => {

    let possibleValues: IDropDownFilterValueMap[] = [
        {label: 'India', value: 'india'},
        {label: 'United Kingdom', value: 'uk'}
    ];

    let handleChange: jest.Mock<void> = jest.fn<void>();

    const dropDownSelect: ShallowWrapper<IDropDownValueProps, void> = shallow<IDropDownValueProps,  void> (
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
        expect(dropDownSelect.props()[``]);
        done();
    }, [
        ['prop', 'propValue'],
        ['value', 'india'],
        ['onChange', handleChange]
    ]);

    it('should call handleChange function onChange', () => {
        expect(handleChange).not.toBeCalled();
        dropDownSelect.find('FormControl').simulate('change');
        expect(handleChange).toBeCalled(); 
    });
});
