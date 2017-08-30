jest.unmock('../../src/components/header-footer-layout');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount} from 'enzyme';
import {FooterView} from '../../src/components/header-footer-layout';

const unroll: any = require('unroll');
unroll.use(it);

describe('When FooterView is rendered', (): void => {
    const componentTree: ShallowWrapper<void, void> = shallow<void, void> (
        <FooterView/>
    );

    it('should render an div element', (): void => {
        expect(componentTree.find('div').length).toBe(1);
    });
});