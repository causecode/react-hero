"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MissingActionPayloadError = (function (_super) {
    __extends(MissingActionPayloadError, _super);
    function MissingActionPayloadError() {
        var _this;
        var message = 'No Data in the Action Payload. Please make sure you are' +
            ' returning an instanceList from the server.';
        _this = _super.call(this, message) || this;
        _this.name = 'MissingActionPayloadError';
        _this.message = message;
        return _this;
    }
    return MissingActionPayloadError;
}(Error));
exports.MissingActionPayloadError = MissingActionPayloadError;
//# sourceMappingURL=MissingActionPayloadError.js.map