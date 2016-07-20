export class MissingInstanceListError extends Error {
    constructor() {
        let message = 'Cannot render page without an instance list.';
        super(message);
        this.name = 'MissingInstanceListError';
        this.message = message;
    }
}
