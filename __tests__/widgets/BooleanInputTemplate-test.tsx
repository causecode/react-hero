jest.unmock('../../src/components/widgets/Input/BooleanInputTemplate');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount} from 'enzyme';
import IInputProps from '../../src/components/widgets/Input';
import BooleanInputTemplate from '../../src/components/widgets/Input/BooleanInputTemplate';
const unroll: any = require<any>('unroll');

unroll.use(it);

const handleChange = jest.fn();

describe('Test for DropDownInputTemplate', (): void => {

    describe('Test for initial rendering', (): void => {
        const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
            <BooleanInputTemplate/>
        );

        unroll('should render #element #count times', (
                done: () => void,
                args: {element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        },  [
                ['element', 'count'],
                ['Row', 1],
                ['Col', 2],
                ['Radio', 2],
            ]
        );
    });

    describe('Test for styles passed', (): void => {
        const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
            <BooleanInputTemplate style={{inputCSS: {color:'red', borderRadius: '50px'}}}/>
        );

        const containerStyle = componentTree.find('div.radio').get(0).style._values;

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

    describe('Test for custom radio button labels', (): void => {
        const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
            <BooleanInputTemplate radioButtonLabels={{first: 'Accept', second: 'Decline'}}/>
        );

        test('for label of first Radio', (): void => {
            expect(componentTree.find('div.radio').first().text()).toBe('Accept');
        });

        test('for label of second Radio', ():void => {
            expect(componentTree.find('div.radio').last().text()).toBe('Decline');
        });
    });

    describe('Test for handleChange', (): void => {
        const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
            <BooleanInputTemplate onChange={handleChange}/>
        );
        test('when onChange is triggered', (): void => {
            componentTree.find('input[type="radio"]').first().simulate('change');
            expect(handleChange).toHaveBeenCalled();
        });
    });

});
