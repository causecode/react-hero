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
var FooterView = (function (_super) {
    __extends(FooterView, _super);
    function FooterView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FooterView.prototype.render = function () {
        var footerClass = this.props.isSticky ? 'footer container navbar-fixed-bottom' : 'footer';
        return (React.createElement("div", { style: [this.props.style], className: footerClass }, this.props.children));
    };
    FooterView = __decorate([
        Radium
    ], FooterView);
    return FooterView;
}(React.Component));
exports.FooterView = FooterView;
//# sourceMappingURL=FooterView.js.map