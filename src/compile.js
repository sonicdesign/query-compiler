import QueryObjectCompiler from './QueryObjectCompiler';
import InvalidQueryError from './InvalidQueryError';

const queryObjectCompiler = new QueryObjectCompiler();

export default function compile(input) {
    let type = typeof input;

    if(Array.isArray(input) || type === 'object') {
        return queryObjectCompiler.compile(input);
    }

    throw new InvalidQueryError(`Argument of type ${type} cannot be compiled.`);
}
