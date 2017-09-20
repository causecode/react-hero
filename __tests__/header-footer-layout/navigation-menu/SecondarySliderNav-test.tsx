jest.unmock('../../../src/components/header-footer-layout');

import * as React from 'react';
import { Provider } from 'react-redux';
import {shallow, ShallowWrapper, EnzymePropSelector, mount} from 'enzyme';
import {SecondarySliderNav} from '../../../src/components/header-footer-layout';
import {SliderNav} from '../../../src/components/header-footer-layout/navigation-menu/SliderNav';
import {configureStore} from '../../../src/store';
import {IUserAction} from '../../../public/interfaces';
import {ISecondarySliderNavProps} from '../../../src/components/header-footer-layout/navigation-menu/SecondarySliderNav';

const unroll: any = require('unroll');
unroll.use(it);

const setSecondaryNav = jest.fn<IUserAction>();
const toggleSecondaryNav = jest.fn<IUserAction>();

describe('When SecondarySliderNav is rendered', (): void => {
    const componentTree: ShallowWrapper<ISecondarySliderNavProps, void> = mount<ISecondarySliderNavProps, void> (
        <Provider store={configureStore(
            {
                secondaryNavOpen: true,
                toggleSecondaryNav,
                setSecondaryNav,
                navMenu: {
                    primaryNavCount: 0,
                    secondaryNavCount: 0,
                },
            },
        )}>
            <SecondarySliderNav>
                <h1>This is a secondary navigation.</h1>
            </SecondarySliderNav>
        </Provider>
    );

    unroll('it should render #elementName #count times', (
        done: () => void,
        args: {elementName: string, element: EnzymePropSelector, count: number}
    ): void => {
        expect(componentTree.find(args.element).length).toBe(args.count);
        done();
    }, [
        ['elementName', 'element', 'count'],
        ['sliderNav', SliderNav, 1],
        ['h1', 'h1', 1],
    ]);
});