jest.unmock('../../src/components/widgets/Input/DropDownInputTemplate');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper} from 'enzyme';
import {IInputProps} from '../../src/components/widgets/Input';
import {DropDownInputTemplate} from '../../src/components/widgets/Input/DropDownInputTemplate';

const Select = require<any>('react-select');
const CreatableSelect = require<any>('react-select').Creatable;
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test for DropDownInputTemplate', (): void => {

    const handleChange: jest.Mock<void> = jest.fn<void>();

    describe('Test for initial rendering', (): void => {

        unroll('should render #elementName #count times', (
                done: () => void,
                args: {elementName: string, element: EnzymePropSelector, count: number, isCreatable: boolean}
        ): void => {
            const componentTree: ShallowWrapper<IInputProps, void> = shallow<IInputProps, void> (
                <DropDownInputTemplate creatable={args.isCreatable}/>
            );

            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count', 'isCreatable'],
            ['Select', Select, 1, false],
            ['CreatableSelect', CreatableSelect, 1, true]
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

        test('when options prop is passed', (): void => {
            const componentTree: ReactWrapper<IInputProps, void> = mount<IInputProps, void> (
                <DropDownInputTemplate options={[{label: 'A', value: 'A'}, {label: 'B', value: 'B'}]}/>
            );

            componentTree.find('input').simulate('change');
            expect(componentTree.find('div.Select-menu-outer').length).toBe(1);
        });

        describe('Test for handleChange', (): void => {

            unroll('when #changeFunction is triggered', (
                    done: () => void,
                    args: {changeFunction: string}
            ): void => {
                const componentTree: ShallowWrapper<IInputProps, void> = shallow<IInputProps, void> (
                    <DropDownInputTemplate
                            onChange={handleChange}
                            onInputChange={handleChange}
                            onInputKeyDown={handleChange}
                    />
                );

                componentTree.find('Select').simulate(args.changeFunction);
                expect(handleChange).toHaveBeenCalled();
                done();
            }, [
                ['changeFunction'],
                ['change'],
                ['inputChange'],
                ['inputKeyDown'],
            ]);
        });
    });
});
