export class InvalidInstanceDataError extends Error {
    constructor() {
        let message: string = 'Cannot instantiate Model with instanceData. ' +
                'Please make sure the instanceData passed contains an id field';
        super(message);
        this.name = 'InvalidInstanceDataError';
        this.message = message;
    }
}
