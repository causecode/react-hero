export class MissingInstanceError extends Error {
    constructor() {
        let message = 'Cannot render page without a model instance.';
        super(message);
        this.name = 'MissingInstanceError';
        this.message = message;
    }
}
