jest.unmock('../../src/components/header-footer-layout');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper} from 'enzyme';
import {Provider} from 'react-redux';
import {HeaderView} from '../../src/components/header-footer-layout';
import {configureStore} from '../../src/store/index';
import {NavMenuLauncherIcon} from '../../src/components/NavMenuLauncherIcon';
import {IHeaderViewProps} from '../../src/components/header-footer-layout/HeaderView';

const unroll: any = require('unroll');

unroll.use(it);

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
    describe('Click simulation of NavMenuLauncherIcon', (): void => {
        it('Should Handle click for PrimaryNavIcon and SecondaryNavIcon', () => {
            expect(componentTree.find(NavMenuLauncherIcon).first().simulate('click'));
            expect(componentTree.find(NavMenuLauncherIcon).last().simulate('click'));
        });
    });
});
