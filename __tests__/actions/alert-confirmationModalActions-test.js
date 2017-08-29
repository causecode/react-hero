"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../../src/actions/alertActions');
jest.unmock('../../src/actions/confirmationModalActions');
var AlertActions = require("../../src/actions/alertActions");
var ConfirmationModalActions = require("../../src/actions/confirmationModalActions");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for alertActions and confirmationModalActions', function () {
    var expectedAction = function (type) {
        return {
            type: type,
        };
    };
    unroll('should create #type action', function (done, args) {
        expect(args.action()).toEqual(expectedAction(args.type));
        done();
    }, [
        ['action', 'type'],
        [ConfirmationModalActions.showConfirmationModal, 'SHOW_CONFIRMATION_MODAL'],
        [ConfirmationModalActions.hideConfirmationModal, 'HIDE_CONFIRMATION_MODAL'],
        [AlertActions.setAlertInvisible, 'HIDE_ALERT'],
    ]);
    it('should create setAlertVisible action', function () {
        var result = { type: 'SHOW_ALERT', payload: { alertType: 'info', alertMessage: 'Success' } };
        expect(AlertActions.setAlertVisible('info', 'Success')).toEqual(result);
    });
});
