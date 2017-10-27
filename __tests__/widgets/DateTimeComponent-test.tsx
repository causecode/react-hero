jest.unmock('../../src/components/widgets/Input/DateTimeComponent');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper} from 'enzyme';
import {DateTimeComponent} from '../../src/components/widgets/Input/DateTimeComponent';
import {FormControl} from '../../src/components/ReusableComponents';
import {IInputProps} from '../../src/components/widgets/Input';
const unroll: any = require<any>('unroll');

unroll.use(it);

const handleChange = jest.fn<void>();

describe('Tests for DateTimeComponent', (): void => {

    describe('Test for initial rendering', (): void => {
        const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
            <DateTimeComponent/>
        );

        unroll('should render #elementName #count times', (
                done: () => void,
                args: {elementName: string, element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count'],
            ['FormControl', FormControl, 1],
        ]);
    });

    describe('Test for styles passed', (): void => {
        const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
            <DateTimeComponent style={{inputCSS: {color:'red', borderRadius: '50px'}}}/>
        );

        // Accessing DOM element to check for styles to make sure the passed styles are rendered.
        const containerStyle: CSS = componentTree.find('input').get(0).style._values;

        unroll('should contain #property with #value value', (
                done: () => void,
                args: {property: string, value: string}
        ): void => {
            expect(containerStyle[args.property]).toBe(args.value);
            done();
        }, [
            ['property', 'value'],
            ['color', 'red'],
            ['border-radius', '50px'],
        ]);
    });

    describe('Test for handleChange', (): void => {
        test('when onChange is triggered', (): void => {
            const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
                <DateTimeComponent change={handleChange}/>
            );

            const event: React.FormEvent = {target: {value: '2017-10-24'}};
            componentTree.find('input').simulate('change', event);

            expect(handleChange).toHaveBeenCalled();
        });
    });

    describe('Test for propertyValue', (): void => {
        test('when propertyValue prop is passed', (): void => {
            const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
                <DateTimeComponent propertyValue='2017-10-24'/>
            );

            expect(componentTree.find('input').props().value).toBe('2017-10-24');
        });
    });

});
