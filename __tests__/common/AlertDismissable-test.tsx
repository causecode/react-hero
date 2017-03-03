jest.unmock('../../src/components/common/AlertDismissable');

import * as React from 'react';
import {Provider} from 'react-redux';
import {ShallowWrapper, shallow, ReactWrapper, mount} from 'enzyme';
import {Alert} from '../../src/components/ReusableComponents';
import {store, configureStore} from '../../src/store';
import {IAlertType} from '../../src/interfaces';
import {
    AlertDismissable,
    AlertDismissableImpl,
    IAlertDismissableProps,
} from '../../src/components/common/AlertDismissable';
const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for AlertDismissable', (): void => {

    let alertDismissable: ShallowWrapper<IAlertDismissableProps, void> = shallow<IAlertDismissableProps, void>(
            <AlertDismissableImpl />
    );

    describe('When prop show is false or null', (): void => {
        unroll('should not render Alert when show = #label', (
            done: () => void,
            args: {label: string, propValue: boolean}
        ): void => {
            alertDismissable.setProps({show: args.propValue});
            expect(alertDismissable.find(Alert).length).toBe(0);
            done();
        }, [
            ['label', 'propValue'],
            ['null', null],
            ['false', false],
        ]);
    });

    describe('When prop show is true', (): void => {

       unroll('should render #elementName', (
            done: () => void,
            args: {element: string}
        ): void => {
            alertDismissable.setProps({show: true});
            expect(alertDismissable.find(args.element).length).toBe(1);
            done();
        }, [
            ['elementName', 'element'],
            ['Alert', Alert],
            ['strong', 'strong'],
            ['span', 'span'],
        ]);
    });

    describe('When AlertDismissable is mounted', (): void => {

        let alertDismissableState: IAlertType = {show: true, type: 'info', message: 'Success'!};

        it('should display alert component of passed prop type', (): void => {
            let alert: ReactWrapper<IAlertDismissableProps, void> = mount<IAlertDismissableProps, void>(
                    <Provider store={configureStore({alertDismissable: alertDismissableState})}>
                        <AlertDismissable />
                    </Provider>
            );

            expect(alert.find(Alert).props()[`bsStyle`]).toEqual(alertDismissableState.type);
        });
    });
});
