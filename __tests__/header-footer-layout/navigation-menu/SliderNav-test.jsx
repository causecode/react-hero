"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../../../src/components/header-footer-layout');
var React = require("react");
var enzyme_1 = require("enzyme");
var SliderNav_1 = require("../../../src/components/header-footer-layout/navigation-menu/SliderNav");
var react_motion_1 = require("react-motion");
var react_redux_1 = require("react-redux");
var store_1 = require("../../../src/store");
var unroll = require('unroll');
unroll.use(it);
var setPrimaryNav = jest.fn();
var setSecondaryNav = jest.fn();
var toggleNav = jest.fn();
var toggleSecondaryNav = jest.fn();
describe('SliderNav Test', function () {
    describe('It should render a primary NavMenu', function () {
        var componentTree = enzyme_1.shallow(<SliderNav_1.SliderNavImpl setPrimaryNav={setPrimaryNav} setSecondaryNav={setSecondaryNav} isPrimaryNav={true}/>);
        it('Should render a Motion', function () {
            expect(componentTree.find(react_motion_1.Motion).length).toBe(1);
        });
    });
    describe('When connected to store', function () {
        var componentTree = enzyme_1.mount(<react_redux_1.Provider store={store_1.configureStore({
            open: false,
            secondaryNavOpen: true,
            toggleNav: toggleNav,
            toggleSecondaryNav: toggleSecondaryNav,
            setPrimaryNav: setPrimaryNav,
            setSecondaryNav: setSecondaryNav,
        })}>
                <SliderNav_1.SliderNav isPrimaryNav={false}/>
            </react_redux_1.Provider>);
        it('Should render a Motion', function () {
            expect(componentTree.find(react_motion_1.Motion).length).toBe(1);
        });
    });
    describe('Click simulation of Primary Toggle', function () {
        var componentTree = enzyme_1.mount(<react_redux_1.Provider store={store_1.configureStore({
            open: true,
            secondaryNavOpen: false,
            toggleNav: toggleNav,
            toggleSecondaryNav: toggleSecondaryNav,
            setPrimaryNav: setPrimaryNav,
            setSecondaryNav: setSecondaryNav,
        })}>
                <SliderNav_1.SliderNav isPrimaryNav={true}/>
            </react_redux_1.Provider>);
        it('Should Handle click for Close Icon', function () {
            expect(componentTree.find('.fa-times').first().simulate('click'));
        });
    });
    describe('Click simulation of Secondary Toggle', function () {
        var componentTree = enzyme_1.mount(<react_redux_1.Provider store={store_1.configureStore({
            open: false,
            secondaryNavOpen: true,
            toggleNav: toggleNav,
            toggleSecondaryNav: toggleSecondaryNav,
            setPrimaryNav: setPrimaryNav,
            setSecondaryNav: setSecondaryNav,
        })}>
                <SliderNav_1.SliderNav isPrimaryNav={false}/>
            </react_redux_1.Provider>);
        it('Should Handle click for Close Icon', function () {
            expect(componentTree.find('.fa-times').last().simulate('click'));
        });
    });
});
