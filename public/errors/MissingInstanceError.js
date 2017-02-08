"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MissingInstanceError = (function (_super) {
    __extends(MissingInstanceError, _super);
    function MissingInstanceError() {
        var _this;
        var message = 'Cannot render page without a model instance.';
        _this = _super.call(this, message) || this;
        _this.name = 'MissingInstanceError';
        _this.message = message;
        return _this;
    }
    return MissingInstanceError;
}(Error));
exports.MissingInstanceError = MissingInstanceError;
//# sourceMappingURL=MissingInstanceError.js.map