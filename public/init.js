function capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
;
function isEmpty() {
    return (!this || !Object.keys(this).length);
}
;
function objectEach(callback) {
    var _this = this;
    if (!(callback instanceof Function)) {
        return;
    }
    if (!(this instanceof Object)) {
        throw new Error('Current Instance in forEach is not an Object');
    }
    Object.keys(this).forEach(function (key) {
        callback(key, _this[key]);
    });
}
function arrayEach(callback) {
    if (!(callback instanceof Function)) {
        return;
    }
    if (!(this instanceof Array)) {
        throw new Error('Current Instance in forEach is not an Array');
    }
    this.forEach(function (element, index) {
        callback(element, index);
    });
}
function equals(obj) {
    try {
        if ((this instanceof Object && obj instanceof Object) || (this instanceof Array && obj instanceof Array)) {
            return (JSON.stringify(this) === JSON.stringify(obj));
        }
    }
    catch (e) {
        return this === obj;
    }
    return this === obj;
}
Array.prototype.each = arrayEach;
Array.prototype.equals = equals;
String.prototype.capitalize = capitalize;
//# sourceMappingURL=init.js.map