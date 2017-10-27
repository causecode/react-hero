jest.unmock('../../src/components/widgets/Input/ListInputTemplate');

import * as React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper} from 'enzyme';
import {IInputProps} from '../../src/components/widgets/Input';
import {ListInputTemplate, IListInputState} from '../../src/components/widgets/Input/ListInputTemplate';
import {FormControl, Col, Row, Button} from '../../src/components/ReusableComponents';
const unroll: any = require<any>('unroll');

unroll.use(it);

const handleChange = jest.fn<void>();

describe('Tests for DropDownInputTemplate', (): void => {

    describe('Test for initial rendering', (): void => {
        const componentTree: ShallowWrapper<IInputProps, void> = shallow<IInputProps, void> (
            <ListInputTemplate/>
        );

        unroll('should render #elementName #count times', (
                done: () => void,
                args: {element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count'],
            ['div', 'div', 1],
            ['Row', Row, 1],
            ['Col', Col, 2],
            ['Button', Button, 1],
            ['ListGroup', ListGroup, 1],
            ['ListGroupItem', ListGroupItem, 1],
            ['FormControl', FormControl, 1],
        ]);
    });

    describe('Tests for actions', (): void => {

        test('when handleTextChange is triggered', (): void => {
            const componentTree: ReactWrapper<IInputProps, IListInputState> =
                mount<IInputProps, IListInputState> (
                    <ListInputTemplate/>
            );
            const event: React.FormEvent = {target: {value: 'abcd'}};
            componentTree.find('input').simulate('change', event);

            expect(componentTree.state().newListItem).toBe('abcd');
        });

        describe('when addListItem is triggered', (): void => {
            test('without propertyValue prop', (): void => {
                const componentTree: ReactWrapper<IInputProps, IListInputState> =
                    mount<IInputProps, IListInputState> (
                        <ListInputTemplate onChange={handleChange}/>
                );
                componentTree.find('button').simulate('click');
                expect(handleChange).toHaveBeenCalled();
            });

            test('with propertyValue prop', (): void => {
                const componentTree: EnzymePropSelector<IInputProps, IListInputState> =
                    mount<IInputProps, IListInputState> (
                        <ListInputTemplate onChange={handleChange} propertyValue={['a','b','c']}/>
                );
                componentTree.find('button').simulate('click');
                expect(handleChange).toHaveBeenCalled();
            });
        });

    });

    describe('Tests for styles passed as prop', (): void => {
        const componentTree: ReactWrapper<IInputProps, IListInputState> = mount<IInputProps, IListInputState> (
            <ListInputTemplate
                    style={{
                        inputCSS: {color:'red', borderRadius: '50px'},
                        listCSS: {color:'blue', borderRadius: '10px'},
                        btnCSS: {color:'yellow', borderRadius: '25px'},
                    }}
            />
        );

        describe('Test for styles in Input', (): void => {
            const containerStyle = componentTree.find('input').get(0).style._values;

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

        describe('Test for styles in List', (): void => {
            const containerStyle = componentTree.find('li').get(0).style._values;

            unroll('should contain #property with #value value', (
                    done: () => void,
                    args: {property: string, value: string}
            ): void => {
                expect(containerStyle[args.property]).toBe(args.value);
                done();
            }, [
                ['property', 'value'],
                ['color', 'blue'],
                ['border-radius', '10px'],
            ]);
        });

        describe('Test for styles in Button', (): void => {
            const containerStyle = componentTree.find('button').get(0).style._values;

            unroll('should contain #property with #value value', (
                    done: () => void,
                    args: {property: string, value: string}
            ): void => {
                expect(containerStyle[args.property]).toBe(args.value);
                done();
            }, [
                ['property', 'value'],
                ['color', 'yellow'],
                ['border-radius', '25px'],
            ]);
        });
    });
});
