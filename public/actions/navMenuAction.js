"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPrimaryNav = function (visibilityStatus) {
    return {
        type: 'SHOW_PRIMARY_NAV',
        payload: visibilityStatus,
    };
};
exports.showSecondaryNav = function (visibilityStatus) {
    return {
        type: 'SHOW_SECONDARY_NAV',
        payload: visibilityStatus,
    };
};
//# sourceMappingURL=navMenuAction.js.map