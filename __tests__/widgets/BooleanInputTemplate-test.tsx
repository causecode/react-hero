jest.unmock('../../src/components/widgets/Input/BooleanInputTemplate');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper} from 'enzyme';
import {IInputProps} from '../../src/components/widgets/Input';
import {BooleanInputTemplate} from '../../src/components/widgets/Input/BooleanInputTemplate';
import {Col, Row, Radio} from '../../src/components/ReusableComponents';

const unroll: any = require<any>('unroll');

unroll.use(it);

const handleChange = jest.fn<void>();

describe('Tests for DropDownInputTemplate', (): void => {

    describe('Tests for initial rendering', (): void => {
        const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
            <BooleanInputTemplate/>
        );

        unroll('should render #elementName #count times', (
                done: () => void,
                args: {elementName: string, element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count'],
            ['Row', Row, 1],
            ['Col', Col, 2],
            ['Radio', Radio, 2],
        ]);
    });

    describe('Test for styles accepted as a prop', (): void => {
        const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
            <BooleanInputTemplate style={{inputCSS: {color:'red', borderRadius: '50px'}}}/>
        );

        // Accessing DOM element to check for styles to make sure the passed styles are rendered.
        const containerStyle: CSS = componentTree.find('div.radio').get(0).style._values;

        unroll('should contain #property with #value value', (
                done: () => void,
                args: {property: string, value: string}
        ): void => {
            expect(containerStyle[args.property]).toEqual(args.value);
            done();
        }, [
            ['property', 'value'],
            ['color', 'red'],
            ['border-radius', '50px'],
        ]);
    });

    describe('Tests for custom radio button labels', (): void => {
        const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
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
        const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
            <BooleanInputTemplate onChange={handleChange}/>
        );

        test('when onChange is triggered', (): void => {
            componentTree.find('input[type="radio"]').first().simulate('change');
            expect(handleChange).toHaveBeenCalled();
        });
    });

});
