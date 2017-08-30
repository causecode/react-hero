"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return (<div style={errorTextStyle}>
            <RadiumFontAwesome style={{ verticalAlign: 'middle' }} name="exclamation-circle" size="2x"/>
            <span>{message}</span>
        </div>);
}
exports.ErrorPage = ErrorPage;
