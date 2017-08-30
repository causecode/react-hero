jest.unmock('../../src/components/header-footer-layout');

import * as React from 'react';
import {shallow, ShallowWrapper, EnzymePropSelector, mount} from 'enzyme';
import {HeaderFooterLayout} from '../../src/components/header-footer-layout';
import {
    HeaderView,
    FooterView,
    ContentView,
    PrimarySliderNav,
    SecondarySliderNav
} from '../../src/components/header-footer-layout';

const unroll: any = require('unroll');
unroll.use(it);

describe('HeaderFooterLayout Test', () => {
    describe('When no children is passed', (): void => {
        const componentTree: ShallowWrapper<void, void> = shallow<void, void> (
            <HeaderFooterLayout/>
        );

        unroll('it should render #element #count times', (
        done: () => void,
        args: {elementName: string, element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['element', 'count'],
            ['div', 1],
            [HeaderView, 0],
            [FooterView, 0],
            [ContentView, 0],
            [PrimarySliderNav, 0],
            [SecondarySliderNav, 0],
        ]);
    });

    describe('When all childrens are passed', (): void => {
        const componentTree: ShallowWrapper<void, void> = shallow<void, void> (
            <HeaderFooterLayout>
                <HeaderView>Header Here</HeaderView>
                <FooterView>Footer Here</FooterView>
                <ContentView>Content Here</ContentView>
                <PrimarySliderNav>Primary Slider Here</PrimarySliderNav>
                <SecondarySliderNav>Secondary Slider Here</SecondarySliderNav>
            </HeaderFooterLayout>
        );

        unroll('it should render #element #count times', (
        done: () => void,
        args: {elementName: string, element: EnzymePropSelector, count: number}
        ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['element', 'count'],
            ['div', 1],
            [HeaderView, 1],
            [FooterView, 1],
            [ContentView, 1],
            [PrimarySliderNav, 1],
            [SecondarySliderNav, 1],
        ]);
    });
})