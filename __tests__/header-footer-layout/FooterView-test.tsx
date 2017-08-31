jest.unmock('../../src/components/header-footer-layout');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {FooterView} from '../../src/components/header-footer-layout';

const unroll: any = require('unroll');
unroll.use(it);

describe('FooterView Test', (): void => {
    describe('When isSticky is not passed', (): void => {
        const componentTree: ShallowWrapper<void, void> = shallow<void, void> (
            <FooterView/>
        );

        it('should render an div with class footer only', (): void => {
            expect(componentTree.find('.footer').length).toBe(1);
            expect(componentTree.find('.container').length).toBe(0);
        });
    });

    describe('When isSticky is passed', (): void => {
        const componentTree: ShallowWrapper<void, void> = shallow<void, void> (
            <FooterView isSticky={true}/>
        );

        it('should render an div containing class container', (): void => {
            expect(componentTree.find('.container').length).toBe(1);
        });
    });
});

