"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var NavMenuLauncherIcon = (function (_super) {
    __extends(NavMenuLauncherIcon, _super);
    function NavMenuLauncherIcon() {
        var _this = _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            _this.props.onClick();
        };
        return _this;
    }
    NavMenuLauncherIcon.prototype.render = function () {
        return (React.createElement("span", { style: this.props.style, className: "burger-icon highlight-on-hover float-" + this.props.position, onClick: this.handleClick },
            React.createElement("span", { className: "fa fa-bars" })));
    };
    return NavMenuLauncherIcon;
}(React.Component));
exports.NavMenuLauncherIcon = NavMenuLauncherIcon;
NavMenuLauncherIcon.defaultProps = {
    onClick: function () { },
    position: 'left',
    style: {}
};
//# sourceMappingURL=NavMenuLauncherIcon.js.map