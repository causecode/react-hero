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
        var _a = this.props, onEnter = _a.onEnter, path = _a.path, component = _a.component, redirectTo = _a.redirectTo;
        return onEnter() ? React.createElement(Route, { path: path, component: component }) : React.createElement(Redirect, { from: path, to: redirectTo });
    };
    return AuthRoute;
}(React.Component));
exports.AuthRoute = AuthRoute;
//# sourceMappingURL=AuthRoute.js.map