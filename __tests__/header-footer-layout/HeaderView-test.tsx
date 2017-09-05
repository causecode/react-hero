import {IGenericAction} from "../../src/interfaces/index";

jest.unmock('../../src/components/header-footer-layout');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper} from 'enzyme';
import {Provider} from 'react-redux';
import {HeaderView} from '../../src/components/header-footer-layout';
import {configureStore} from '../../src/store/index';
import {NavMenuLauncherIcon} from '../../src/components/NavMenuLauncherIcon';
import {IHeaderViewProps} from '../../src/components/header-footer-layout/HeaderView';
import {IUserAction, IGenericAction} from '../../src/interfaces';
import {toggleNav, toggleSecondaryNav} from '../../src/actions/modelActions';

const unroll: any = require('unroll');

unroll.use(it);

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

describe('HeaderView test', (): void => {
    const componentTree: ReactWrapper<IHeaderViewProps, void> = mount<IHeaderViewProps, void>(
        <Provider store={configureStore(
            {
                open: false,
                secondaryNavOpen: false,
                navMenu: {
                    primaryNav: true,
                    secondaryNav: true,
                },
            })}>
            <HeaderView>
                <h1>Hello, I am a header!!</h1>
            </HeaderView>
        </Provider>
    );

    unroll('it should render #elementName #count times', (
        done: () => void,
        args: {elementName: string, element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        },  [
            ['elementName', 'element', 'count'],
            ['div', 'div', 1],
            ['h1', 'h1', 1],
            ['NavMenuLauncherIcon', NavMenuLauncherIcon, 2],
        ]
    );
    describe('Click simulation of NavMenuLauncherIcon for toggling PrimarySliderNav and SeconadrySliderNav', (): void => {
        it('Should Handle click for PrimaryNavIcon', (): void => {
            expect(toggleNav).not.toBeCalled();
            expect(componentTree.find(NavMenuLauncherIcon).first().simulate('click'));
            expect(toggleNav).toBeCalled();
        });

        it('Should Handle click for SecondaryNavIcon', (): void => {
            expect(toggleSecondaryNav).not.toBeCalled();
            expect(componentTree.find(NavMenuLauncherIcon).last().simulate('click'));
            expect(toggleSecondaryNav).toBeCalled();
        });
    });
});
