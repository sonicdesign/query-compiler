

export default class QueryObjectCompiler {





    compileObject(queryObject) {


        let compiledObject = {};

        for(let propertyName in queryObject) {

            let value = queryObject[propertyName];

            if(!Array.isArray(value)) {
                value = [value];
            }

            for(let filterObject of )

        }


    }




}
