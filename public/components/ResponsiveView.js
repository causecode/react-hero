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
require("../init");
var constants_1 = require("../constants");
var DeviceTypes = (function () {
    function DeviceTypes(id, name) {
        this.id = id;
        this.name = name;
        if (DeviceTypes.allDeviceTypes && DeviceTypes.allDeviceTypes.length) {
            throw new Error(constants_1.INSTANTIATION_ERROR);
        }
        this.id = id;
        this.name = name;
    }
    DeviceTypes.prototype.getName = function () {
        return this.name;
    };
    DeviceTypes.prototype.getId = function () {
        return this.id;
    };
    DeviceTypes.isMobile = function () {
        return DeviceTypes.getCurrentDevice().getName().toLowerCase().indexOf('mobile') > -1;
    };
    DeviceTypes.isTablet = function () {
        return DeviceTypes.getCurrentDevice().getName().toLowerCase().indexOf('tablet') > -1;
    };
    DeviceTypes.isDesktop = function () {
        return DeviceTypes.getCurrentDevice().getName().toLowerCase().indexOf('default') > -1;
    };
    DeviceTypes.getCurrentDevice = function () {
        var indicator = document.createElement('div');
        indicator.className = 'state-indicator';
        document.body.appendChild(indicator);
        var deviceId = parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10);
        document.body.removeChild(indicator);
        return DeviceTypes.getDeviceTypeFromIdOrString(deviceId);
    };
    DeviceTypes.getDeviceTypeFromIdOrString = function (identifier) {
        if (typeof identifier === 'string') {
            identifier = identifier.toLowerCase();
        }
        for (var _i = 0, _a = DeviceTypes.allDeviceTypes; _i < _a.length; _i++) {
            var deviceType = _a[_i];
            if (deviceType.getId() === identifier || deviceType.getName().toLowerCase() === identifier) {
                return deviceType;
            }
        }
        throw new Error('No matching device for the given identifier.');
    };
    return DeviceTypes;
}());
DeviceTypes.DESKTOP = new DeviceTypes(0, 'default');
DeviceTypes.TABLET = new DeviceTypes(1, 'tablet');
DeviceTypes.TABLET_PORTRAIT = new DeviceTypes(2, 'tabletPortrait');
DeviceTypes.TABLET_LANDSCAPE = new DeviceTypes(3, 'tabletLandscape');
DeviceTypes.MOBILE = new DeviceTypes(4, 'mobile');
DeviceTypes.MOBILE_PORTRAIT = new DeviceTypes(5, 'mobilePortrait');
DeviceTypes.MOBILE_LANDSCAPE = new DeviceTypes(6, 'mobileLandscape');
DeviceTypes.allDeviceTypes = [
    DeviceTypes.MOBILE,
    DeviceTypes.MOBILE_PORTRAIT,
    DeviceTypes.MOBILE_LANDSCAPE,
    DeviceTypes.TABLET,
    DeviceTypes.TABLET_PORTRAIT,
    DeviceTypes.TABLET_LANDSCAPE,
    DeviceTypes.DESKTOP
];
exports.DeviceTypes = DeviceTypes;
var ResponsiveView = (function (_super) {
    __extends(ResponsiveView, _super);
    function ResponsiveView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResponsiveView.prototype.render = function () {
        var currentDeviceType = DeviceTypes.getCurrentDevice();
        var deviceSpecificRenderFunction = "render" + currentDeviceType.getName().capitalize();
        var renderFunction = this[deviceSpecificRenderFunction];
        if (!renderFunction) {
            console.warn("Cannot find device " +
                ("specific render function for the device " + currentDeviceType.getName().capitalize()));
            renderFunction = this.renderDefault;
        }
        renderFunction = renderFunction ? renderFunction.bind(this) : function () { };
        return (React.createElement("div", null, renderFunction()));
    };
    ResponsiveView.prototype.renderMobile = function () {
        return this.renderDefault();
    };
    ResponsiveView.prototype.renderMobilePortrait = function () {
        return this.renderMobile();
    };
    ResponsiveView.prototype.renderMobileLandscape = function () {
        return this.renderMobile();
    };
    ResponsiveView.prototype.renderTablet = function () {
        return this.renderDefault();
    };
    ResponsiveView.prototype.renderTabletPortrait = function () {
        return this.renderTablet();
    };
    ResponsiveView.prototype.renderTabletLandscape = function () {
        return this.renderTablet();
    };
    return ResponsiveView;
}(React.Component));
exports.ResponsiveView = ResponsiveView;
//# sourceMappingURL=ResponsiveView.js.map