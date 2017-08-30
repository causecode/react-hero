jest.unmock('../../../src/components/header-footer-layout');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount} from 'enzyme';
import {SecondarySliderNav} from '../../../src/components/header-footer-layout';
import {SliderNav} from '../../../src/components/header-footer-layout/navigation-menu/SliderNav';

const unroll: any = require('unroll');
unroll.use(it);

describe('When SecondarySliderNav is rendered', (): void => {
    const componentTree: ShallowWrapper<void, void> = shallow<void, void> (
        <SecondarySliderNav/>
    );

    it('should render a SliderNav element', (): void => {
        expect(componentTree.find(SliderNav).length).toBe(1);
    });
});
