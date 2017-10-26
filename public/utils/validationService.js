"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationService = (function () {
    function ValidationService() {
        this.messages = {
            required: 'This field is required.',
            email: 'Please enter a valid email address.',
            url: 'Please enter a valid URL.',
            number: 'Please enter a valid number.',
            digits: 'Please enter only digits.',
            min: 'Please enter a value greater than or equal to {{validValue}}.',
            max: 'Please enter a value less than or equal to {{validValue}}.',
            length: 'Please enter all {{validValue}} characters.',
            minlength: 'Please enter at least {{validValue}} characters.',
            maxlength: 'Please enter no more than {{validValue}} characters.',
            editable: 'Please select a value from dropdown.',
            pattern: 'Please fix the pattern.',
            equalTo: 'Please enter the same value again.',
        };
        this.validators = {
            required: function () { },
        };
    }
    ValidationService.prototype.validate = function () {
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;
//# sourceMappingURL=validationService.js.map