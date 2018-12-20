"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var reactRouterDom = require('react-router-dom');
var AuthRoute = (function (_super) {
    __extends(AuthRoute, _super);
    function AuthRoute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthRoute.prototype.render = function () {
        var Route = reactRouterDom.Route, Redirect = reactRouterDom.Redirect;
        var _a = this.props, onEnter = _a.onEnter, path = _a.path, component = _a.component, redirectTo = _a.redirectTo, exact = _a.exact;
        var routeProps = exact ? { path: path, component: component, exact: exact } : { path: path, component: component };
        return onEnter() ? React.createElement(Route, __assign({}, routeProps)) : React.createElement(Redirect, { from: path, to: redirectTo });
    };
    return AuthRoute;
}(React.Component));
exports.AuthRoute = AuthRoute;
//# sourceMappingURL=AuthRoute.js.map