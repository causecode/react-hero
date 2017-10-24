jest.unmock('../../src/components/widgets/Input/DateTimeComponent');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount} from 'enzyme';
import {FormControl} from 'react-bootstrap';
import IInputProps from '../../src/components/widgets/Input';
import DateTimeComponent from '../../src/components/widgets/Input/DateTimeComponent';
const unroll: any = require<any>('unroll');

unroll.use(it);

const handleChange = jest.fn();

describe('Test for DateTimeComponent', (): void => {

    describe('Test for initial rendering', (): void => {
        const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
            <DateTimeComponent/>
        );

        unroll('should render #elementName #count times', (
                done: () => void,
                args: {elementName: string, element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        },  [
                ['elementName', 'element', 'count'],
                ['FormControl', FormControl, 1],
            ]
        );
    });

    describe('Test for styles passed', (): void => {
        const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
            <DateTimeComponent style={{inputCSS: {color:'red', borderRadius: '50px'}}}/>
        );

        let containerStyle = componentTree.find('input').get(0).style._values;
        console.log(componentTree.find('input').get(0).style._values);

        unroll('should contain #property with #value value', (
                done: () => void,
                args: {property: string, value: string}
        ): void => {
            expect(containerStyle[args.property]).toBe(args.value);
            done();
        },  [
                ['property', 'value'],
                ['color', 'red'],
                ['border-radius', '50px'],
            ]
        );
    });

    describe('Test for handleChange', (): void => {
        test('when onChange is triggered', (): void => {
            const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
                <DateTimeComponent change={handleChange}/>
            );

            const event: React.FormEvent = {target: {value: '2017-10-24'}};
            componentTree.find('input').simulate('change', event);

            expect(handleChange).toHaveBeenCalled();
        });
    });

    describe('Test for propertyValue', (): void => {
        test('when propertyValue prop is passed', (): void => {
            const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
                <DateTimeComponent propertyValue='2017-10-24'/>
            );

            expect(componentTree.find('input').props().value).toBe('2017-10-24');
        });
    });

});
