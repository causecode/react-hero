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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Radium = require("radium");
var SliderNav_1 = require("./SliderNav");
var SecondarySliderNav = (function (_super) {
    __extends(SecondarySliderNav, _super);
    function SecondarySliderNav() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecondarySliderNav.prototype.render = function () {
        return (React.createElement(SliderNav_1.SliderNav, { navStyle: [navStyle, this.props.style], isPrimaryNav: false, navContent: this.props.children }));
    };
    return SecondarySliderNav;
}(React.Component));
SecondarySliderNav = __decorate([
    Radium
], SecondarySliderNav);
exports.SecondarySliderNav = SecondarySliderNav;
var navStyle = {
    padding: 'none',
};
//# sourceMappingURL=SecondarySliderNav.js.map