jest.unmock('../../../src/components/header-footer-layout');

import {ISliderNavProps} from '../../../src/components/header-footer-layout/navigation-menu/SliderNav';
import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper} from 'enzyme';
import {SliderNav, SliderNavImpl} from '../../../src/components/header-footer-layout/navigation-menu/SliderNav';
import {Motion} from 'react-motion';
import {Provider} from 'react-redux';
import {configureStore} from '../../../src/store';

const unroll: any = require('unroll');
unroll.use(it);

const setPrimaryNav = jest.fn();
const setSecondaryNav = jest.fn();
const toggleNav = jest.fn();
const toggleSecondaryNav = jest.fn();

describe('SliderNav Test', () => {
    describe('It should render a primary NavMenu', () => {
        const componentTree: ShallowWrapper<ISliderNavProps, void> = shallow<ISliderNavProps, void> (
            <SliderNavImpl setPrimaryNav={setPrimaryNav} setSecondaryNav={setSecondaryNav} isPrimaryNav={true}/>
        );
        it('Should render a Motion', (): void => {
            expect(componentTree.find(Motion).length).toBe(1);
        });
    });

    describe('When connected to store', () => {
        const componentTree: ReactWrapper<IHeaderViewProps, void> = mount<IHeaderViewProps, void>(
            <Provider store={configureStore(
                {
                        open: false,
                        secondaryNavOpen: true,
                        toggleNav,
                        toggleSecondaryNav,
                        setPrimaryNav,
                        setSecondaryNav,
                    },
                )}>
                <SliderNav isPrimaryNav={false}/>
            </Provider>

        );
        it('Should render a Motion', (): void => {
            expect(componentTree.find(Motion).length).toBe(1);
        });
    });

    describe('Click simulation of Primary Toggle', () => {
        const componentTree: ReactWrapper<IHeaderViewProps, void> = mount<IHeaderViewProps, void>(
            <Provider store={configureStore(
                {
                    open: true,
                    secondaryNavOpen: false,
                    toggleNav,
                    toggleSecondaryNav,
                    setPrimaryNav,
                    setSecondaryNav,
                },
            )}>
                <SliderNav isPrimaryNav={true}/>
            </Provider>

        );
        it('Should Handle click for Close Icon', (): void => {
            expect(componentTree.find('.fa-times').first().simulate('click'));
        });
    });

    describe('Click simulation of Secondary Toggle', () => {
        const componentTree: ReactWrapper<IHeaderViewProps, void> = mount<IHeaderViewProps, void>(
            <Provider store={configureStore(
                {
                    open: false,
                    secondaryNavOpen: true,
                    toggleNav,
                    toggleSecondaryNav,
                    setPrimaryNav,
                    setSecondaryNav,
                },
            )}>
                <SliderNav isPrimaryNav={false}/>
            </Provider>

        );
        it('Should Handle click for Close Icon', (): void => {
            expect(componentTree.find('.fa-times').last().simulate('click'));
        });
    });
});
