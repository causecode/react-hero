jest.unmock('../../src/components/widgets/Input/DropDownInputTemplate');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount} from 'enzyme';
import IInputProps from '../../src/components/widgets/Input';
import DropDownInputTemplate from '../../src/components/widgets/Input/DropDownInputTemplate';
const unroll: any = require<any>('unroll');

unroll.use(it);

const handleChange = jest.fn();

describe('Test for DropDownInputTemplate', (): void => {

    describe('Test for initial rendering', (): void => {
        const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
            <DropDownInputTemplate/>
        );

        unroll('should render #element #count times', (
                done: () => void,
                args: {element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        },  [
                ['element', 'count'],
                ['select', 1],
                ['option', 1],
            ]
        );
    });

    describe('Test for styles passed', (): void => {
        const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
            <DropDownInputTemplate style={{inputCSS: {color:'red', borderRadius: '50px'}}}/>
        );

        const containerStyle = componentTree.find('select').get(0).style._values;

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

    describe('Test for enum prop passed', (): void => {
        const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
            <DropDownInputTemplate enum={['optionA', 'optionB', 'optionC']}/>
        );

        unroll('should render #element #count times', (
                done: () => void,
                args: {element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        },  [
                ['element', 'count'],
                ['select', 1],
                ['option', 4],
            ]
        );
    });

    describe('Test for handleChange', (): void => {
        test('when onChange is triggered', (): void => {
            const componentTree: EnzymePropSelector<IInputProps, void> = mount<IInputProps, void> (
                <DropDownInputTemplate onChange={handleChange}/>
            );

            componentTree.find('select').simulate('change');
            expect(handleChange).toHaveBeenCalled();
        });
    });

});
