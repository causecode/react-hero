"use strict";
var store_1 = require("../store");
exports.getUserRoles = function () {
    var userRoles = store_1.store.getState().currentUser.toJS().userRoles;
    return userRoles || null;
};
function hasAllRoles(roles) {
    var currentUserRoles = exports.getUserRoles();
    if (currentUserRoles) {
        return roles.every(function (role) {
            return (currentUserRoles.indexOf(role.trim()) > -1);
        });
    }
    return false;
}
exports.hasAllRoles = hasAllRoles;
function hasAnyRole(roles) {
    var currentUserRoles = exports.getUserRoles();
    if (currentUserRoles) {
        return roles.some(function (role) {
            return (currentUserRoles.indexOf(role.trim()) > -1);
        });
    }
    return false;
}
exports.hasAnyRole = hasAnyRole;
function isAdmin(nextState, replace) {
    if (!hasAnyRole(['ROLE_ADMIN'])) {
        replace({
            pathname: '/unauthorized',
            state: { nextPathname: nextState.location.pathname },
        });
    }
}
exports.isAdmin = isAdmin;
function isCrmManager(nextState, replace) {
    if (!hasAnyRole(['ROLE_ADMIN', 'ROLE_CRM_MANAGER', 'ROLE_CRM_USER'])) {
        replace({
            pathname: '/unauthorized',
            state: { nextPathname: nextState.location.pathname },
        });
    }
}
exports.isCrmManager = isCrmManager;
function isEmployee(nextState, replace) {
    if (!hasAnyRole(['ROLE_EMPLOYEE', 'ROLE_EMPLOYEE_MANAGER', 'ROLE_CONTENT_MANAGER', 'ROLE_CRM_USER', 'ROLE_USER'])) {
        replace({
            pathname: '/unauthorized',
            state: { nextPathname: nextState.location.pathname },
        });
    }
}
exports.isEmployee = isEmployee;
//# sourceMappingURL=permission.js.map