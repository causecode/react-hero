"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReusableComponents_1 = require("../../ReusableComponents");
exports.BooleanInputTemplate = function (props) {
    var radioButtonLabels = props.radioButtonLabels, propertyName = props.propertyName, propertyValue = props.propertyValue, style = props.style;
    var handleChange = function (e) {
        props.onChange(e.target["value"] === 'option-true');
    };
    return (React.createElement(ReusableComponents_1.Row, null,
        React.createElement(ReusableComponents_1.Col, { sm: 6 },
            React.createElement(ReusableComponents_1.Radio, { onChange: handleChange, value: "option-true", name: propertyName, checked: propertyValue, style: style && style.inputCSS ? style.inputCSS : {} }, radioButtonLabels && radioButtonLabels.first ? radioButtonLabels.first : 'True')),
        React.createElement(ReusableComponents_1.Col, { sm: 6 },
            React.createElement(ReusableComponents_1.Radio, { onChange: handleChange, value: "option-false", name: propertyName, checked: !propertyValue, style: style && style.inputCSS ? style.inputCSS : {} }, radioButtonLabels && radioButtonLabels.second ? radioButtonLabels.second : 'False'))));
};
//# sourceMappingURL=BooleanInputTemplate.js.map