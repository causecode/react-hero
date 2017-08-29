"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../../src/components/common/AlertDismissable');
var React = require("react");
var react_redux_1 = require("react-redux");
var enzyme_1 = require("enzyme");
var ReusableComponents_1 = require("../../src/components/ReusableComponents");
var store_1 = require("../../src/store");
var AlertDismissable_1 = require("../../src/components/common/AlertDismissable");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for AlertDismissable', function () {
    var alertDismissable = enzyme_1.shallow(<AlertDismissable_1.AlertDismissableImpl />);
    describe('When prop show is false or null', function () {
        unroll('should not render Alert when show is #label', function (done, args) {
            alertDismissable.setProps({ show: args.propValue });
            expect(alertDismissable.find(ReusableComponents_1.Alert).length).toBe(0);
            done();
        }, [
            ['label', 'propValue'],
            ['null', null],
            ['false', false],
        ]);
    });
    describe('When prop show is true', function () {
        unroll('should render #elementName', function (done, args) {
            alertDismissable.setProps({ show: true });
            expect(alertDismissable.find(args.element).length).toBe(1);
            done();
        }, [
            ['elementName', 'element'],
            ['Alert', ReusableComponents_1.Alert],
            ['strong', 'strong'],
            ['span', 'span'],
        ]);
    });
    describe('When AlertDismissable is mounted', function () {
        var alertDismissableState = { show: true, type: 'info', message: 'Success' };
        it('should display alert component of passed prop type', function () {
            var alert = enzyme_1.mount(<react_redux_1.Provider store={store_1.configureStore({ alertDismissable: alertDismissableState })}>
                        <AlertDismissable_1.AlertDismissable />
                    </react_redux_1.Provider>);
            expect(alert.find(ReusableComponents_1.Alert).props()["bsStyle"]).toEqual(alertDismissableState.type);
        });
    });
});
