import ExtendableError from './ExtendableError';
import QueryObjectCompiler from './QueryObjectCompiler';

export class InvalidArgumentError extends ExtendableError {
    constructor(message) {
        super(message);
    }
}

const queryObjectCompiler = new QueryObjectCompiler();

export default function compile(input) {
    let type = typeof input;

    if(Array.isArray(input) || type === 'object') {
        return queryObjectCompiler.compile(input);
    }

    throw new InvalidArgumentError(`Argument of type ${type} cannot be compiled.`);
}
