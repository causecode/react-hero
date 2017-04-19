"use strict";
var store_1 = require("../store");
var alertActions_1 = require("../actions/alertActions");
var confirmationModalActions_1 = require("../actions/confirmationModalActions");
function showModal() {
    store_1.store.dispatch(confirmationModalActions_1.showConfirmationModal());
}
exports.showModal = showModal;
;
function hideModal() {
    store_1.store.dispatch(confirmationModalActions_1.hideConfirmationModal());
}
exports.hideModal = hideModal;
;
function showAlert(type, message, hideAfter) {
    store_1.store.dispatch(alertActions_1.setAlertVisible(type, message));
    setTimeout(function () {
        hideAlert();
    }, hideAfter || 5000);
}
exports.showAlert = showAlert;
function hideAlert() {
    store_1.store.dispatch(alertActions_1.setAlertInvisible());
}
exports.hideAlert = hideAlert;
function scrollToTop() {
    setTimeout(function () {
        document.body.scrollTop = document.body.scrollTop - 70;
        if (document.body.scrollTop > 0) {
            scrollToTop();
        }
    }, 50);
}
exports.scrollToTop = scrollToTop;
//# sourceMappingURL=commonUtils.js.map