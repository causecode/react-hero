export class MissingActionPayloadError extends Error {
    constructor() {
        let message: string = 'No Data in the Action Payload. Please make sure you are' +
        ' returning an instanceList from the server.';
        super(message);
        this.name = 'MissingActionPayloadError';
        this.message = message;
    }
}
