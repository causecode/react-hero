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
var react_bootstrap_1 = require("react-bootstrap");
var BaseModel_1 = require("../../models/BaseModel");
var ModelPropTypes_1 = require("../../models/ModelPropTypes");
var appService_1 = require("../../utils/appService");
// TODO handle how dates are displayed.
var GenericShowPage = (function (_super) {
    __extends(GenericShowPage, _super);
    function GenericShowPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericShowPage.prototype.render = function () {
        var instance = this.props.instance;
        var instanceProperties = instance.properties;
        if (appService_1.isEmpty(instanceProperties)) {
            throw new Error('Instance not found while rendering GenericShowPage');
        }
        var instanceKeys = Object.keys(instanceProperties);
        return (<react_bootstrap_1.Table responsive bordered className="data-show-table">
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {instanceKeys.map(function (key, index) {
            var currentPropType = instance.propTypes[key];
            if (currentPropType.type === ModelPropTypes_1.ModelPropTypes.objectInputType) {
                return (<tr key={index}>
                                    <td><strong>{key}</strong></td>
                                    <td style={{ padding: '0px' }}>
                                        <react_bootstrap_1.Table>
                                            <tbody>
                                                {Object.keys(instanceProperties[key])
                    .map(function (subKey, subIndex) {
                    return (<tr key={subIndex}>
                                                            <td><strong>{subKey}</strong></td>
                                                            <td>{instanceProperties[key][subKey].toString()}</td>
                                                        </tr>);
                })}        
                                            </tbody>
                                        </react_bootstrap_1.Table>
                                    </td>
                                </tr>);
            }
            return (<tr key={index}>
                                <td><strong>{key}</strong></td>
                                <td>{instanceProperties[key].toString()}</td>
                            </tr>);
        })}
                </tbody>
            </react_bootstrap_1.Table>);
    };
    return GenericShowPage;
}(React.Component));
GenericShowPage.defaultProps = {
    instance: new BaseModel_1.DefaultModel({}),
};
exports.GenericShowPage = GenericShowPage;
