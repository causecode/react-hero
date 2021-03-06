jest.unmock('../../src/components/widgets/Input/GenericInputTemplate');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper} from 'enzyme';
import {IInputProps} from '../../src/components/widgets/Input';
import {GenericInputTemplate} from '../../src/components/widgets/Input/GenericInputTemplate';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test for GenericInputTemplate', (): void => {

    const handleChange: jest.Mock<void> = jest.fn<void>();

    describe('Test for initial rendering', (): void => {

        const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
            <GenericInputTemplate/>
        );

        unroll('should render #element #count times', (
                done: () => void,
                args: {element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['element', 'count'],
            ['input', 1],
        ]);
    });

    describe('Test for styles passed', (): void => {

        const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
            <GenericInputTemplate style={{inputCSS: {color:'red', borderRadius: '50px'}}}/>
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

        unroll('when onBlur is #onBlur', (
                done: () => void,
                args: {elementName: string, element: EnzymePropSelector, count: number, isCreatable: boolean}
        ): void => {
            const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
                <GenericInputTemplate onBlur={args.onBlur} onChange={handleChange}/>
            );

            componentTree.find('input').simulate(args.action);
            expect(handleChange).toHaveBeenCalled();
            done();
        }, [
            ['action', 'onBlur'],
            ['blur', true],
            ['change', false],
        ]);
    });
});
