"use strict";
var React = require("react");
var react_router_1 = require("react-router");
var componentService_1 = require("./utils/componentService");
var modelService_1 = require("./utils/modelService");
var react_redux_1 = require("react-redux");
var testImplementations_1 = require("./demo/testImplementations");
var react_dom_1 = require("react-dom");
var store_1 = require("./store");
modelService_1.ModelService.registerAll();
componentService_1.ComponentService.registerAll();
react_dom_1.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(react_router_1.Router, { history: react_router_1.hashHistory },
        React.createElement(react_router_1.Route, { path: "*", component: testImplementations_1.NewPage }))), document.getElementsByClassName('main-container')[0]);
//# sourceMappingURL=test-index.js.map