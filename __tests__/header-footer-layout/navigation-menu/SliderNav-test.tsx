jest.unmock('../../../src/components/header-footer-layout');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper} from 'enzyme';
import {Motion} from 'react-motion';
import {Provider} from 'react-redux';
import {SliderNav, SliderNavImpl, ISliderNavProps} from '../../../src/components/header-footer-layout/navigation-menu/SliderNav';
import {configureStore} from '../../../src/store';
import {IUserAction, IGenericAction} from '../../../src/interfaces';
import {toggleNav, toggleSecondaryNav} from '../../../src/actions/modelActions';

const unroll: any = require('unroll');
unroll.use(it);

const setPrimaryNav = jest.fn<IUserAction>();
const setSecondaryNav = jest.fn<IUserAction>();
toggleNav = jest.fn<IGenericAction>(() => {
    return {
        type: 'TOGGLE_NAV',
    };
});
toggleSecondaryNav = jest.fn<IGenericAction>(() => {
    return {
        type: 'TOGGLE_SECONDARY_NAV',
    };
});

describe('SliderNav Test', (): void => {
    describe('It should render a primary NavMenu', () => {
        const componentTree: ShallowWrapper<ISliderNavProps, void> = shallow<ISliderNavProps, void> (
            <SliderNavImpl setPrimaryNav={setPrimaryNav} setSecondaryNav={setSecondaryNav} isPrimaryNav={true}/>
        );
        it('should render a Motion', (): void => {
            expect(componentTree.find(Motion).length).toBe(1);
        });
    });

    describe('When connected to store', (): void => {
        const componentTree: ReactWrapper<ISliderNavProps, void> = mount<ISliderNavProps, void>(
            <Provider store={configureStore(
                    {
                        open: false,
                        secondaryNavOpen: true,
                        toggleNav,
                        toggleSecondaryNav,
                        setPrimaryNav,
                        setSecondaryNav,
                        navMenu: {
                            primaryNavCount: 0,
                            secondaryNavCount: 0,
                        },
                    },
                )}>
                <SliderNav isPrimaryNav={false}/>
            </Provider>

        );
        it('should render a Motion', (): void => {
            expect(componentTree.find(Motion).length).toBe(1);
        });
    });

    describe('Click simulation of Primary Toggle', (): void => {
        const componentTree: ReactWrapper<ISliderNavProps, void> = mount<ISliderNavProps, void>(
            <Provider store={configureStore(
                {
                    open: true,
                    secondaryNavOpen: false,
                    navMenu: {
                        primaryNavCount: 0,
                        secondaryNavCount: 0,
                    },
                },
            )}>
                <SliderNav isPrimaryNav={true}/>
            </Provider>

        );
        it('should Handle click for Close Icon', (): void => {
            expect(toggleNav).not.toBeCalled();
            componentTree.find('i').simulate('click');
            expect(toggleNav).toBeCalled();
        });
    });

    describe('Click simulation of Secondary Toggle', (): void => {
        const componentTree: ReactWrapper<ISliderNavProps, void> = mount<ISliderNavProps, void>(
            <Provider store={configureStore(
                {
                    open: false,
                    secondaryNavOpen: true,
                    navMenu: {
                        primaryNavCount: 0,
                        secondaryNavCount: 0,
                    },
                },
            )}>
                <SliderNav isPrimaryNav={false}/>
            </Provider>

        );
        it('should Handle click for Close Icon', (): void => {
            expect(toggleSecondaryNav).not.toBeCalled();
            componentTree.find('i').simulate('click');
            expect(toggleSecondaryNav).toBeCalled();
        });
    });

    describe('When more than two Navigation Slider is present', (): void => {
        const componentTree: ReactWrapper<ISliderNavProps, void> = mount<ISliderNavProps, void>(
            <Provider store={configureStore(
                {
                    open: false,
                    secondaryNavOpen: true,
                    navMenu: {
                        primaryNavCount: 2,
                        secondaryNavCount: 2,
                    },
                },
            )}>
                <SliderNav isPrimaryNav={false}/>
            </Provider>

        );
        it('should log an error message and not render a navigation slider', (): void => {
            expect(componentTree.find(Motion).length).toBe(0);
        });
    });
});
