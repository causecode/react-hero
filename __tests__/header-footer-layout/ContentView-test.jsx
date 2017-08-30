"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../../src/components/header-footer-layout');
var React = require("react");
var enzyme_1 = require("enzyme");
var header_footer_layout_1 = require("../../src/components/header-footer-layout");
var unroll = require('unroll');
unroll.use(it);
describe('When FooterView is rendered', function () {
    var componentTree = enzyme_1.shallow(<header_footer_layout_1.ContentView />);
    it('should render an div element', function () {
        expect(componentTree.find('div').length).toBe(1);
    });
});
