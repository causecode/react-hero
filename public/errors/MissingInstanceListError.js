"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MissingInstanceListError = (function (_super) {
    __extends(MissingInstanceListError, _super);
    function MissingInstanceListError() {
        var _this;
        var message = 'Cannot render page without an instance list.';
        _this = _super.call(this, message) || this;
        _this.name = 'MissingInstanceListError';
        _this.message = message;
        return _this;
    }
    return MissingInstanceListError;
}(Error));
exports.MissingInstanceListError = MissingInstanceListError;
//# sourceMappingURL=MissingInstanceListError.js.map