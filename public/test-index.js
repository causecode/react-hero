"use strict";
var store_1 = require("./store");
var TestImplementations_1 = require("./components/TestImplementations");
var react_router_1 = require("react-router");
var React = require('react');
var react_dom_1 = require('react-dom');
var react_redux_1 = require('react-redux');
react_dom_1.render(React.createElement(react_redux_1.Provider, {store: store_1.store}, React.createElement(react_router_1.Router, {history: react_router_1.browserHistory}, React.createElement(react_router_1.Route, {path: "/", component: TestImplementations_1.NewPage}))), document.getElementsByClassName('main-container')[0]);
//# sourceMappingURL=test-index.js.map