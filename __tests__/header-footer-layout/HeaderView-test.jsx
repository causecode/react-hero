"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../../src/components/header-footer-layout');
var React = require("react");
var enzyme_1 = require("enzyme");
var header_footer_layout_1 = require("../../src/components/header-footer-layout");
var react_redux_1 = require("react-redux");
var unroll = require('unroll');
var index_1 = require("../../src/store/index");
var NavMenuLauncherIcon_1 = require("../../src/components/NavMenuLauncherIcon");
unroll.use(it);
var componentTree = enzyme_1.mount(<react_redux_1.Provider store={index_1.configureStore({
    open: false,
    secondaryNavOpen: false,
    navMenu: {
        primaryNav: true,
        secondaryNav: true,
    },
})}>
        <header_footer_layout_1.HeaderView />
    </react_redux_1.Provider>);
describe('HeaderView test', function () {
    describe('It should render a div when rendered successfully', function () {
        var componentTree = enzyme_1.shallow(<header_footer_layout_1.HeaderViewImpl />);
        it('Should render a single div', function () {
            expect(componentTree.find('div').length).toBe(1);
        });
    });
    describe('When connected to store', function () {
        it('Should render 2 NavMenuLauncherIcon', function () {
            expect(componentTree.find(NavMenuLauncherIcon_1.NavMenuLauncherIcon).length).toBe(2);
        });
    });
    describe('Click simulation of NavMenuLauncherIcon', function () {
        it('Should Handle click for PrimaryNavIcon and SecondaryNavIcon', function () {
            expect(componentTree.find(NavMenuLauncherIcon_1.NavMenuLauncherIcon).first().simulate('click'));
            expect(componentTree.find(NavMenuLauncherIcon_1.NavMenuLauncherIcon).last().simulate('click'));
        });
    });
});
