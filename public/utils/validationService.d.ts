export declare class ValidationService {
    messages: {
        required: string;
        email: string;
        url: string;
        number: string;
        digits: string;
        min: string;
        max: string;
        length: string;
        minlength: string;
        maxlength: string;
        editable: string;
        pattern: string;
        equalTo: string;
    };
    validators: {
        required: () => void;
    };
    validate(): void;
}
