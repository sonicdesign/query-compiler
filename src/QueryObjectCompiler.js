import InvalidQueryError from './errors';


export default class QueryObjectCompiler {

    /**
    * Converts a high level query expression object or array of objects in to an array of low-level query objects.
    *
    * @param   {object|array} queryFilters
    * @returns {array.<object>}
    */
    compileObject(queryFilters) {
        let compiledQueryFilters = [];

        if(!Array.isArray(queryFilters)) {
            queryFilters = [queryFilters];
        }

        for(let queryFilter of queryFilters) {

            let compiledFilter = {};

            for(let propertyName in queryFilter) {

                let comparisons = queryFilter[propertyName];

                if(!Array.isArray(comparisons)) {
                    comparisons = [comparisons];
                }

                if(!comparisons.length) {
                    throw new InvalidQueryError(`The comparison provided for the property '${propertyName}' is an empty array, which is invalid.`);
                }

                let compiledComparisons = [];

                for(let comparison of comparisons) {
                    let type = typeof comparison;

                    if(type === 'object') {
                        // The comparison is an object where the keys are comparison operators (e.g. '=', '<', etc)
                        // and the values are values that will be used for the comparison.
                        this._validateComparison(comparison);
                        compiledComparisons.push(comparison);
                    } else {
                        // The comparison is just a value; use the default 'equals' operator.
                        compiledComparisons.push({'=': comparison});
                    }
                }
                compiledFilter[propertyName] = compiledComparisons;
            }
            compiledQueryFilters.push(compiledFilter);
        }
        return compiledQueryFilters;
    }

    _validateComparison(comparison) {

        if(!Object.keys(comparison)) {
            throw new InvalidQueryError(`A comparison object without keys was provided.`);
        }

        let comparisonOperators = Object.keys(comparison);

        let invalidOperators = comparisonOperators.filter(o => !this._validComparisonOperators.includes(o));

        if(invalidOperators.length) {
            throw new InvalidQueryError(`Invalid comparison opearator(s) specified: ${JSON.stringify(invalidOperators)}`);
        }
    }

    get _validComparisonOperators() {
        return ['=', '>', '<', '>=', '<=', '!='];
    }
}
