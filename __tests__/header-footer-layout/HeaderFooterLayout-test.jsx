"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../../src/components/header-footer-layout');
var React = require("react");
var enzyme_1 = require("enzyme");
var header_footer_layout_1 = require("../../src/components/header-footer-layout");
var header_footer_layout_2 = require("../../src/components/header-footer-layout");
var unroll = require('unroll');
unroll.use(it);
describe('HeaderFooterLayout Test', function () {
    describe('When no children is passed', function () {
        var componentTree = enzyme_1.shallow(<header_footer_layout_1.HeaderFooterLayout />);
        unroll('it should render #element #count times', function (done, args) {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['element', 'count'],
            ['div', 1],
            [header_footer_layout_2.HeaderView, 0],
            [header_footer_layout_2.FooterView, 0],
            [header_footer_layout_2.ContentView, 0],
            [header_footer_layout_2.PrimarySliderNav, 0],
            [header_footer_layout_2.SecondarySliderNav, 0],
        ]);
    });
    describe('When all childrens are passed', function () {
        var componentTree = enzyme_1.shallow(<header_footer_layout_1.HeaderFooterLayout>
                <header_footer_layout_2.HeaderView>Header Here</header_footer_layout_2.HeaderView>
                <header_footer_layout_2.FooterView>Footer Here</header_footer_layout_2.FooterView>
                <header_footer_layout_2.ContentView>Content Here</header_footer_layout_2.ContentView>
                <header_footer_layout_2.PrimarySliderNav>Primary Slider Here</header_footer_layout_2.PrimarySliderNav>
                <header_footer_layout_2.SecondarySliderNav>Secondary Slider Here</header_footer_layout_2.SecondarySliderNav>
            </header_footer_layout_1.HeaderFooterLayout>);
        unroll('it should render #element #count times', function (done, args) {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['element', 'count'],
            ['div', 1],
            [header_footer_layout_2.HeaderView, 1],
            [header_footer_layout_2.FooterView, 1],
            [header_footer_layout_2.ContentView, 1],
            [header_footer_layout_2.PrimarySliderNav, 1],
            [header_footer_layout_2.SecondarySliderNav, 1],
        ]);
    });
});
