jest.unmock('../../../src/components/header-footer-layout');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, ReactWrapper, mount} from 'enzyme';
import {Provider} from 'react-redux';
import {PrimarySliderNav} from '../../../src/components/header-footer-layout';
import {SliderNav} from '../../../src/components/header-footer-layout/navigation-menu/SliderNav';
import {IPrimarySliderNavProps} from '../../../src/components/header-footer-layout/navigation-menu/PrimarySliderNav';
import {configureStore} from '../../../src/store';
import {IUserAction, IGenericAction} from '../../../src/interfaces/index';

const unroll: any = require('unroll');
unroll.use(it);

const setPrimaryNav = jest.fn<IUserAction>();
const toggleNav = jest.fn<IGenericAction>();

describe('When PrimarySliderNav is rendered', (): void => {
    const componentTree: ReactWrapper<IPrimarySliderNavProps, void> = mount<IPrimarySliderNavProps, void> (
        <Provider store={configureStore(
            {
                open: false,
                toggleNav,
                setPrimaryNav,
                navMenu: {
                    primaryNavCount: 0,
                    secondaryNavCount: 0,
                },
            },
        )}>
            <PrimarySliderNav>
                <h1>Hi, I am a child of PrimarySliderNav</h1>
            </PrimarySliderNav>
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
            ['SliderNav', SliderNav, 1],
            ['h1', 'h1', 1],
        ]
    );
});
