"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function isAdmin() {
    if (!hasAnyRole(['ROLE_ADMIN'])) {
        return false;
    }
    return true;
}
exports.isAdmin = isAdmin;
function isCrmManager() {
    if (!hasAnyRole(['ROLE_ADMIN', 'ROLE_CRM_MANAGER', 'ROLE_CRM_USER'])) {
        return false;
    }
    return true;
}
exports.isCrmManager = isCrmManager;
function isEmployee() {
    if (!hasAnyRole(['ROLE_EMPLOYEE', 'ROLE_EMPLOYEE_MANAGER', 'ROLE_CONTENT_MANAGER', 'ROLE_CRM_USER', 'ROLE_USER'])) {
        return false;
    }
    return true;
}
exports.isEmployee = isEmployee;
//# sourceMappingURL=permission.js.map