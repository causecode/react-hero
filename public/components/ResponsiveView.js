"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var DeviceTypes = (function () {
    function DeviceTypes(id, name) {
        this.id = id;
        this.name = name;
        if (DeviceTypes.allDeviceTypes && DeviceTypes.allDeviceTypes.length) {
            throw new Error("Error: Instantiation Failed: Trying to create a new instance of DeviceTypes. Please use\n                    one of the predefined Device types.");
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
        return DeviceTypes.getCurrentDevice().getName().toLowerCase().indexOf('mobile') > 0;
    };
    DeviceTypes.isTablet = function () {
        return DeviceTypes.getCurrentDevice().getName().toLowerCase().indexOf('tablet') > 0;
    };
    DeviceTypes.isDesktop = function () {
        return DeviceTypes.getCurrentDevice().getName().toLowerCase().indexOf('default') > 0;
    };
    DeviceTypes.getCurrentDevice = function () {
        var indicator = document.createElement('div');
        indicator.className = 'state-indicator';
        document.body.appendChild(indicator);
        var deviceId = parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10);
        return DeviceTypes.getDeviceTypeFromIdOrString(deviceId);
    };
    DeviceTypes.getDeviceTypeFromIdOrString = function (identifier) {
        for (var _i = 0, _a = DeviceTypes.allDeviceTypes; _i < _a.length; _i++) {
            var deviceType = _a[_i];
            if (deviceType.getId() === identifier || deviceType.getName() === identifier) {
                return deviceType;
            }
        }
        throw new Error('Error: No matching device for the given identifier.');
    };
    DeviceTypes.DESKTOP = new DeviceTypes(0, 'Default');
    DeviceTypes.TABLET = new DeviceTypes(1, 'Tablet');
    DeviceTypes.TABLET_PORTRAIT = new DeviceTypes(2, 'TabletPortrait');
    DeviceTypes.TABLET_LANDSCAPE = new DeviceTypes(3, 'TabletLandscape');
    DeviceTypes.MOBILE = new DeviceTypes(4, 'Mobile');
    DeviceTypes.MOBILE_PORTRAIT = new DeviceTypes(5, 'MobilePortrait');
    DeviceTypes.MOBILE_LANDSCAPE = new DeviceTypes(6, 'MobileLandscape');
    DeviceTypes.allDeviceTypes = [
        DeviceTypes.MOBILE,
        DeviceTypes.MOBILE_PORTRAIT,
        DeviceTypes.MOBILE_LANDSCAPE,
        DeviceTypes.TABLET,
        DeviceTypes.TABLET_PORTRAIT,
        DeviceTypes.TABLET_LANDSCAPE,
        DeviceTypes.DESKTOP
    ];
    return DeviceTypes;
}());
exports.DeviceTypes = DeviceTypes;
var ResponsiveView = (function (_super) {
    __extends(ResponsiveView, _super);
    function ResponsiveView() {
        _super.call(this);
    }
    ResponsiveView.prototype.render = function () {
        var currentDeviceType = DeviceTypes.getCurrentDevice();
        var deviceSpecificRenderFunction = "render" + currentDeviceType.getName();
        return (React.createElement("div", null, this[deviceSpecificRenderFunction]()));
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