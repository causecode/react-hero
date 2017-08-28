"use strict";
var React = require("react");
var Radium = require("radium");
var FontAwesome = require("react-fontawesome");
var RadiumFontAwesome = Radium(FontAwesome);
var errorTextStyle = {
    color: 'red',
    fontWeight: 700,
    lineHeight: '100px',
};
function ErrorPage(_a) {
    var message = _a.message;
    return (React.createElement("div", { style: errorTextStyle },
        React.createElement(RadiumFontAwesome, { style: { verticalAlign: 'middle' }, name: "exclamation-circle", size: "2x" }),
        React.createElement("span", null, message)));
}
exports.ErrorPage = ErrorPage;
//# sourceMappingURL=ErrorPage.js.map