export class ExtendableError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        Error.captureStackTrace(this, this.constructor.name);
    }
}

export class InvalidQueryError extends ExtendableError {
    constructor(message) {
        super(message);
    }
}
