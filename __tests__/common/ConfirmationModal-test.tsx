jest.unmock('../../src/components/common/AlertDismissable');

import * as React from 'react';
import {Provider} from 'react-redux';
import {ShallowWrapper, shallow, ReactWrapper, mount} from 'enzyme';
import {store, configureStore} from '../../src/store';
import {Alert, Modal, Button} from '../../src/components/ReusableComponents';
import {
    ConfirmationModal,
    ConfirmationModalImpl,
    IConfirmationModalProps,
} from '../../src/components/common/ConfirmationModal';
const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for ConfirmationModal', (): void => {

    let onConfirm: jest.Mock<void> = jest.fn<void>();
    let onHide: jest.Mock<void> = jest.fn<void>();

    let confirmationModalImpl: ShallowWrapper<IConfirmationModalProps, void> = shallow<IConfirmationModalProps, void>(
            <ConfirmationModalImpl onConfirm={onConfirm} onHide={onHide}/>
    );

    describe('When prop show is false or null', (): void => {
        unroll('should not render Modal when show is #label', (
            done: () => void,
            args: {label: string, propValue: boolean}
        ): void => {
            confirmationModalImpl.setProps({show: args.propValue});
            expect(confirmationModalImpl.find(Alert).length).toBe(0);
            done();
        }, [
            ['label', 'propValue'],
            ['null', null],
            ['false', false],
        ]);
    });

    describe('When prop show is true', (): void => {

       unroll('should render #count #elementName', (
            done: () => void,
            args: {elementName: string, element: React.ComponentClass<any>, count: number}
        ): void => {
            confirmationModalImpl.setProps({show: true});
            expect(confirmationModalImpl.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count'],
            ['Alert', Modal, 1],
            ['Modal body', Modal.Body, 1],
            ['Modal footer', Modal.Footer, 1],
            ['Button', Button, 2],
        ]);
    });

    unroll('should call #functionName when #buttonName button is clicked', (
        done: () => void,
        args: {index: number, functionName: string, function: jest.Mock<void>, buttonName: string}
    ): void => {
        confirmationModalImpl.find(Button).at(args.index).simulate('click');
        expect(args.function).toBeCalled();
        done();
    }, [
        ['index', 'functionName', 'function', 'buttonName'],
        [0, 'onConfirm', onConfirm, 'Confirm'],
        [1, 'onHide', onHide, 'Cancel'],
    ]);

    describe('When ConfirmationModal is mounted', (): void => {

        let confirmationModal: ReactWrapper<IConfirmationModalProps, void> = mount<IConfirmationModalProps, void>(
                <Provider store={configureStore({confirmationModal: true})}>
                    <ConfirmationModal
                            onConfirm={onConfirm}
                            onHide={onHide}
                            modalBody="Test Modal Body"
                            modalFooter="Test Modal Footer"
                    />
                </Provider>
        );

        unroll('should render #prop with content #value', (
            done: () => void,
            args: {prop: string, value: string}
        ): void => {
            expect(confirmationModal.instance().props.children[`props`][args.prop]).toEqual(args.value);
            done();
        }, [
            ['prop', 'value'],
            ['modalBody', 'Test Modal Body'],
            ['modalFooter', 'Test Modal Footer'],
        ]);
    });
});
