jest.unmock('../../../src/components/header-footer-layout');

import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper, configure} from 'enzyme';
import {Motion} from 'react-motion';
import {Provider} from 'react-redux';
import {configureStore} from '../../../src/store';
import {IUserAction, IGenericAction} from '../../../src/interfaces';
import {toggleNav, toggleSecondaryNav} from '../../../src/actions/modelActions';
import {
    SliderNav, 
    SliderNavImpl,
    ISliderNavProps,
} from '../../../src/components/header-footer-layout/navigation-menu/SliderNav';

const unroll: any = require('unroll');
unroll.use(it);

configure({adapter: new Adapter()});

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
    describe('It should render a primary NavMenu', (): void => {
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

    describe('When onNavClose callback is provided', (): void => {
        const primaryNavCLose: jest.Mock<void> = jest.fn();
        const secondaryNavCLose: jest.Mock<void> = jest.fn();

        const componentTree: ShallowWrapper<ISliderNavProps, void> = shallow<ISliderNavProps, void>(
            <SliderNavImpl setPrimaryNav={setPrimaryNav} setSecondaryNav={setSecondaryNav} />
        );

        unroll('It should call onNavClose passed as prop fro #componentName', (
                done: () => void,
                args: {isPrimaryNav: boolean, callback: jest.Mock<void>, componentName: string},
        ): void => {
            componentTree.setProps({isPrimaryNav: args.isPrimaryNav});

            if (args.isPrimaryNav) {
                componentTree.setProps({onPrimaryNavClose: args.callback});
            } else {
                componentTree.setProps({onSecondaryNavClose: args.callback});
            }

            componentTree.find(Motion).dive().find('i').simulate('click');
            expect(args.callback).toHaveBeenCalled();
            done();
        }, [
            ['isPrimaryNav', 'callback', 'componentName'],
            [true, primaryNavCLose, 'Primary nav'],
            [false, secondaryNavCLose, 'Secondary nav'],
        ]);
    });
});
