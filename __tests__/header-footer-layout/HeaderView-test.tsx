import {IHeaderViewProps} from '../../src/components/header-footer-layout/HeaderView';

jest.unmock('../../src/components/header-footer-layout');
import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount, ReactWrapper} from 'enzyme';
import {HeaderView, HeaderViewImpl} from '../../src/components/header-footer-layout';
import {Provider} from 'react-redux';
const unroll: any = require('unroll');
import {configureStore} from '../../src/store/index';
import {NavMenuLauncherIcon} from '../../src/components/NavMenuLauncherIcon';
import {TOGGLE_NAV} from '../../src/constants';

unroll.use(it);

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
        <HeaderView />
    </Provider>
);




describe('HeaderView test',() => {
    describe('It should render a div when rendered successfully', () => {
        const componentTree: ShallowWrapper<IHeaderViewProps, void> = shallow<IHeaderViewProps, void> (
            <HeaderViewImpl />
        );
        it('Should render a single div', (): void => {
            expect(componentTree.find('div').length).toBe(1);
        });
    });

    describe('When connected to store', () => {
        it('Should render 2 NavMenuLauncherIcon', () => {
            expect(componentTree.find(NavMenuLauncherIcon).length).toBe(2);
        });
    });

    describe('Click simulation of NavMenuLauncherIcon', () => {
        it('Should Handle click for PrimaryNavIcon and SecondaryNavIcon', () => {
            expect(componentTree.find(NavMenuLauncherIcon).first().simulate('click'));
            expect(componentTree.find(NavMenuLauncherIcon).last().simulate('click'));
        });

    });
});
