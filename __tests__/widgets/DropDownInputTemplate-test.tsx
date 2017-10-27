jest.unmock('../../src/components/widgets/Input/DropDownInputTemplate');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper} from 'enzyme';
import {IInputProps} from '../../src/components/widgets/Input';
import {DropDownInputTemplate} from '../../src/components/widgets/Input/DropDownInputTemplate';

const TestUtils = require<any>('react-dom/test-utils');

const Select = require<any>('react-select');
const CreatableSelect = require<any>('react-select').Creatable;
const unroll: any = require<any>('unroll');

unroll.use(it);

const handleChange = jest.fn<void>();

describe('Test for DropDownInputTemplate', (): void => {

    describe('Test for initial rendering', (): void => {
        const componentTree: ShallowWrapper<IInputProps, void> = shallow<IInputProps, void> (
            <DropDownInputTemplate/>
        );

        unroll('should render #elementName #count times', (
                done: () => void,
                args: {elementName: string, element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count'],
            ['Select', Select, 1],
        ]);
    });

    describe('Test for initial rendering with creatable flag', (): void => {
        const componentTree: ShallowWrapper<IInputProps, void> = shallow<IInputProps, void> (
            <DropDownInputTemplate creatable/>
        );

        unroll('should render #elementName #count times', (
                done: () => void,
                args: {elementName: string, element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count'],
            ['CreatableSelect', CreatableSelect, 1],
        ]);
    });

    describe('Test for props passed', (): void => {
        test('when style is passed as prop', (): void => {
            const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
                <DropDownInputTemplate style={{inputCSS: {color:'red', borderRadius: '50px'}}}/>
            );

            // Accessing DOM element to check for styles to make sure the passed styles are rendered.
            const containerStyle: CSS = componentTree.find('div.Select-control').get(0).style._values;

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

        test('when onInputChange is passed as prop', (): void => {
            const componentTree: ShallowWrapper<IInputProps, void> = shallow<IInputProps, void> (
                <DropDownInputTemplate onInputChange={handleChange}/>
            );

            componentTree.find('Select').simulate('inputChange');
            expect(handleChange).toHaveBeenCalled();
        });

        test('when onInputKeyDown is passed as prop', (): void => {
            const componentTree: ShallowWrapper<IInputProps, void> = shallow<IInputProps, void> (
                <DropDownInputTemplate onInputKeyDown={handleChange}/>
            );

            componentTree.find('Select').simulate('inputKeyDown');
            expect(handleChange).toHaveBeenCalled();
        });
    });

    describe('Test for options prop passed', (): void => {
        const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
            <DropDownInputTemplate options={[{label: 'A', value: 'A'}, {label: 'B', value: 'B'}]}/>
        );

        unroll('should render #element #count times', (
                done: () => void,
                args: {element: EnzymePropSelector, count: number}
        ): void => {
            componentTree.find('input').simulate('change');
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['element', 'count'],
            ['div.Select-menu-outer', 1],
        ]);
    });

    describe('Test for handleChange', (): void => {
        test('when onChange is triggered', (): void => {
            const componentTree: ShallowWrapper<IInputProps, void> = shallow<IInputProps, void> (
                <DropDownInputTemplate onChange={handleChange}/>
            );

            componentTree.find('Select').simulate('change');
            expect(handleChange).toHaveBeenCalled();
        });
    });

});
