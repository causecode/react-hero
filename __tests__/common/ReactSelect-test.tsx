jest.unmock('../../src/components/common/ReactSelect');

import * as React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {ReactSelect, IReactSelectProps} from '../../src/components/common/ReactSelect';
import Select = require('react-select');
const unroll = require<any>('unroll');

unroll.use(it);

describe('Test cases for ReactSelect', (): void => {

    let onChange: jest.Mock<void> = jest.fn<void>();
    let onBlur: jest.Mock<void> = jest.fn<void>();
    let onInputChange: jest.Mock<void> = jest.fn<void>();
    let input = {onChange, onBlur, value: '1'};

    let reactSelect: ShallowWrapper<IReactSelectProps, void> = shallow<IReactSelectProps, void> (
            <ReactSelect
                    multi={false}
                    options={[{label: '1', value: 'One'}, {label: '2', value: 'Two'}]}
                    input={input}
                    onInputChange={onInputChange}
            />
    );

    it('should render Select component', (): void => {
        expect(reactSelect.find(Select).length).toBe(1);
    });

    it('should call onChange when value is changed in Select', (): void => {
        reactSelect.find(Select).simulate('change', 'test');
        expect(onChange).toBeCalledWith('test');
    });

    it('should call onBlur when focus is removed from Select', (): void => {
        reactSelect.find(Select).simulate('blur');
        expect(onBlur).toBeCalled();
    });
});
